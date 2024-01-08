const controller = {}
const currentPage = 1;

const jwt = require("jsonwebtoken");
const {client}  = require("../../../config/mongodbConfig");
// Firebase
const admin = require("../../../config/firebaseAdmin");
const dbName = 'Ads-Management';
const fs = require("fs");

controller.show = async (req, res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentRoleInfo = { 
        accountType: decoded.accountType, 
        areaId: decoded.areaId, 
        areaName: decoded.areaName, 
        name: decoded.name,
        avatar: decoded.avatar
    };
    const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

    // Get local data for HCM city's wards and districts
    const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
    let areas = JSON.parse(dataFile);

    //console.log(areas);
    
    let AdForm = []; let LocationType = [];
    let adFormId = []; let locationTypeId = [];
    let adTypeId = []; let AdType = [];
    let AdLocation = []; let AdArea = {};
    let Adplanning = []; let AdplanningId = [];
    adLocationSnapshot.forEach((doc) => {
        let data = doc;

        if (!locationTypeId.includes(data.locationType)) {
            locationTypeId.push(data.locationType);
            LocationType.push({value: data.locationType});
        }

        if (!adFormId.includes(data.adForm)) {
            adFormId.push(data.adForm);
            AdForm.push({value: data.adForm});
        }
        
        if (!adTypeId.includes(data.adType)) {
            adTypeId.push(data.adType);
            AdType.push({value: data.adType});
        }

        if (!AdplanningId.includes(data.planning)) {
            AdplanningId.push(data.planning);
            Adplanning.push({value: data.planning});
        }

        // Lọc ra quận object trong JSON 
        let docDistrict = areas.districts.filter((district) => district.idQuan == doc.idQuan)[0];
        // console.log(docDistrict);
        if (!(docDistrict.idQuan in AdArea)) {
            // Tạo mới quận object
            AdArea[docDistrict.idQuan] = {name: docDistrict.name, idQuan: docDistrict.idQuan, wards: {}}
            // Lọc ra phường object trong quận obj đã lọc
            let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];
            // Tạo mới phường object
            AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong}
        }
        else {
            let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];

            if (!(docWard.idPhuong in AdArea[docDistrict.idQuan]))
                AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong}
        }

        AdLocation.push(data);
    });
    // console.log(AdArea);
    // Filters
    let filterAdFormId = req.query.adFormId;
    if (filterAdFormId)
        AdLocation = AdLocation.filter((loc) => loc.adForm == filterAdFormId);

    let filterLocationTypeId = req.query.locationTypeId;
    if (filterLocationTypeId)
        AdLocation = AdLocation.filter((loc) => loc.locationType == filterLocationTypeId);

    let filterAdTypeId = req.query.adTypeId;
    if (filterAdTypeId)
        AdLocation = AdLocation.filter((loc) => loc.adType == filterAdTypeId);

    let filterDistrictId = req.query.idQuan;
    if (filterDistrictId)
        AdLocation = AdLocation.filter((loc) => loc.idQuan == filterDistrictId);
    let filterWardId = req.query.idPhuong;
    if (filterWardId)
        AdLocation = AdLocation.filter((loc) => loc.idPhuong == filterWardId);
    let filterPlanning = req.query.locationPlanningState;
    if (filterPlanning) 
        AdLocation = AdLocation.filter((loc) => { var state = (filterPlanning === 'true'); return loc.planning == state});
        

    let docDistrict = areas.districts;
    // District: Name + idQuan
    // Ward: Name + idPhuong

    //console.log(docDistrict);
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "adForm": AdForm,
        "roleInfo": currentRoleInfo,
        "locationType": LocationType,
        "adType": AdType,
        "adArea": docDistrict,
        "adPlanning": Adplanning,
        "Area": AdArea,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/ttdqc";
        }
    });
}

controller.add = async (req, res) => {
    let { newAdType, newAdLocationForm, newLocationType, newAdLocationPlanning,newAdLocationDistrict, newAdLocationWard, newAdLocationAddress, newAdLocationLongtitude, newAdLocationLattitude } = req.body;
    const adLocationSnapShot = client.db(dbName).collection("adLocations");
    let idHighest =  (await adLocationSnapShot.find({}).sort({locationId:-1}).limit(1).toArray())[0].locationId;

    // console.log( req.files );
    // console.log( newAdType );
    let bucket = admin.storage().bucket("firstproject-90f9e.appspot.com");
    let i = 0;
    let extension;
    

    async function pushData(thumbnails) {
        const newData = {
            adForm: newAdLocationForm,
            locationType: newLocationType,
            idQuan: newAdLocationDistrict,
            idPhuong: newAdLocationWard,
            address: newAdLocationAddress,
            adType: newAdType,
            reportId: "",
            latitude: parseFloat(newAdLocationLattitude),
            longitude: parseFloat(newAdLocationLongtitude),
            adList: [],
            planning: newAdLocationPlanning == "Đã Quy Hoạch" ? true : false,
            locationId: idHighest + 1,
            thumbnails: thumbnails,
        };

        // await adLocationSnapShot.insertOne(newData);
        const result = await adLocationSnapShot.insertOne(newData);
        if (result.insertedId != null)
            res.redirect("/so/thongtindiadiemquangcao");
    }
    // console.log( idHighest);
    try {
        let thumbnails = Array();
        let i = 0;
        let n = req.files ? req.files.length : 0;

        if (n > 0) {
            let i = 0;

            for (const file of req.files) {
                let extension;

                if (file.mimetype.endsWith("png"))
                    extension = "png";
                else if (file.mimetype.endsWith("jpeg"))
                    extension = "jpeg";
                else
                    extension = "jpg";

                // Upload the thumbnails to storage
                let temp = bucket.file("thongtindiadiemquangcao/" + (idHighest + 1) + "/thumbnail" + i + "." + extension);
                await temp.save(file.buffer, { contentType: file.mimetype });

                let signedURL = await temp.getSignedUrl({ action: "read", expires: '2024-10-24' });
                thumbnails.push({ url: signedURL });

                i = i + 1;

                if (i == req.files.length) {
                    pushData(thumbnails);
                }
            }
        }
        else pushData(thumbnails);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    // res.send("Documents updated successfully");

}

controller.edit = async (req, res) => {
    let { EditAdLocationId, EditAdLocationForm, EditAdLocationPlanning, EditAdType, EditLocationType, EditAdLocationDistrict, EditAdLocationWard, EditAdLocationAddress, EditAdLocationLongtitude, EditAdLocationLattitude } = req.body;
    const adLocationSnapShot = await client.db(dbName).collection("adLocations").findOne({ locationId: parseInt(EditAdLocationId) });
    
    // console.log( idHighest);
    let bucket = admin.storage().bucket("firstproject-90f9e.appspot.com");
    let i = 0;
    let extension;
    // console.log("EditAdLocationId:",EditAdLocationId);
    // console.log("EditAdLocationForm:",EditAdLocationForm);
    // console.log("EditAdType:",EditAdType);
    // console.log("body:",req.body);

    async function updateNewData(thumbnails) {
        const updateData = {
            adForm: EditAdLocationForm ? EditAdLocationForm : adLocationSnapShot.adForm,
            locationType: EditLocationType ? EditLocationType : adLocationSnapShot.locationType,
            adType: EditAdType ? EditAdType : adLocationSnapShot.adType,
            idQuan: EditAdLocationDistrict ? EditAdLocationDistrict : adLocationSnapShot.idQuan,
            idPhuong: EditAdLocationWard ? EditAdLocationWard : adLocationSnapShot.idPhuong,
            address: EditAdLocationAddress ? EditAdLocationAddress : adLocationSnapShot.address,
            latitude: parseFloat(EditAdLocationLattitude ? EditAdLocationLattitude : adLocationSnapShot.latitude),
            longitude: parseFloat(EditAdLocationLongtitude ? EditAdLocationLongtitude : adLocationSnapShot.longitude),
            planning: EditAdLocationPlanning ? EditAdLocationPlanning == "Đã Quy Hoạch" ? true : false : adLocationSnapShot.planning,
            thumbnails: thumbnails,
        };

        // await adLocationSnapShot.insertOne(newData);
        const result = await client.db(dbName).collection("adLocations").updateOne({ locationId: parseInt(EditAdLocationId) }, { $set: updateData });
            // res.redirect("/so/thongtindiadiemquangcao");
        res.send("Documents updated successfully");
    }

    try {
        let thumbnails = Array();
        
        let n = req.files ? req.files.length : 0;
        console.log("n", n);
        if (n > 0) {
            let i = 0;

            for (const file of req.files) {
                let extension;

                if (file.mimetype.endsWith("png"))
                    extension = "png";
                else if (file.mimetype.endsWith("jpeg"))
                    extension = "jpeg";
                else
                    extension = "jpg";

                // Upload the thumbnails to storage
                //let temp = bucket.file("thongtindiadiemquangcao/" + (idHighest + 1) + "/thumbnail" + i + "." + extension);
                
                let filePath = `thongtindiadiemquangcao/${parseInt(EditAdLocationId)}/thumbnail${i}.${extension}`;
                console.log(filePath);

                let temp = bucket.file(filePath);
                await temp.save(file.buffer, { contentType: file.mimetype });

                let signedURL = await temp.getSignedUrl({ action: "read", expires: '2024-10-24' });
                thumbnails.push({ url: signedURL });

                i = i + 1;

                if (i == req.files.length) {
                    updateNewData(thumbnails);
                }
            }

        }
        else updateNewData(adLocationSnapShot.thumbnails);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    // res.send("Documents updated successfully");

}

controller.addNewAd = async (req, res) => {
    const adLocationSnapShot = await client.db(dbName).collection("adLocations").findOne({ locationId: parseInt(req.params.id) });
    var adList = adLocationSnapShot.adList;
    // console.log(adLocationSnapShot);
    // console.log(adList);
    if (adList == null) adList = [];
    adList.push({adId: req.body.adId});
    try {
        await client.db(dbName).collection("adLocations").updateOne({ locationId: parseInt(req.params.id) }, { $set: { adList: adList } });
        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.delete = async (req, res) => {
    try {
        let id = req.params.id;

        // Delete document
        const result = await client.db(dbName).collection("adLocations").deleteOne({ locationId: parseInt(id) });

        // Check if the document was found and deleted
        if (result == null) {
            return res.status(404).send("Document not found");
        }
    
        res.send("Change accepted!");
    }
    catch (error) {
        res.send("Change acceptance error!");
    }
}


module.exports = controller;


