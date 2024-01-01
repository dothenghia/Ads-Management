const controller = {}
const currentPage = 1;

const jwt = require("jsonwebtoken");
const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';
const fs = require("fs");

controller.show = async (req, res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentRoleInfo = { accountType: decoded.accountType, areaId: decoded.areaId, areaName: decoded.areaName, name: decoded.name };

    const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

    // Get local data for HCM city's wards and districts
    const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
    let areas = JSON.parse(dataFile);

    //console.log(areas);
    
    let AdForm = []; let LocationType = [];
    let adFormId = []; let locationTypeId = [];
    let AdLocation = []; let AdArea = {};
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

    // Filters
    let filterAdFormId = req.query.adFormId;
    if (filterAdFormId)
        AdLocation = AdLocation.filter((loc) => loc.adForm == filterAdFormId);

    let filterLocationTypeId = req.query.locationTypeId;
    if (filterLocationTypeId)
        AdLocation = AdLocation.filter((loc) => loc.locationType == filterLocationTypeId);

    let docDistrict = areas.districts;
    // District: Name + idQuan
    // Ward: Name + idPhuong

    //console.log(docDistrict);
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "adForm": AdForm,
        "roleInfo": currentRoleInfo,
        "locationType": LocationType,
        "adArea": docDistrict,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/ttdqc";
        }
    });
}

controller.add = async (req, res) => {
    let { newAdLocationForm, newLocationType, newAdLocationDistrict, newAdLocationWard, newAdLocationAddress, newAdLocationLongtitude, newAdLocationLattitude } = req.body;
    const adLocationSnapShot = client.db(dbName).collection("adLocations");
    let idHighest =  (await adLocationSnapShot.find({}).sort({locationId:-1}).limit(1).toArray())[0].locationId;

    // console.log( idHighest);
    try {
        
        const newData = {
            adForm: newAdLocationForm,
            locationType: newLocationType,
            idQuan: newAdLocationDistrict,
            idPhuong: newAdLocationWard,
            address: newAdLocationAddress,
            adType: "",
            reportId: "",
            latitude: parseFloat(newAdLocationLattitude),
            longitude: parseFloat(newAdLocationLongtitude),
            adList: [],
            planning: true,
            locationId: idHighest + 1,
            thumbnail: [],
        };

        // await adLocationSnapShot.insertOne(newData);
        await adLocationSnapShot.insertOne(newData);

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    //res.send("Documents updated successfully");

}

controller.edit = async (req, res) => {
    let { EditAdLocationId, EditAdLocationForm, EditLocationType, EditAdLocationDistrict, EditAdLocationWard, EditAdLocationAddress, EditAdLocationLongtitude, EditAdLocationLattitude, EditAdList } = req.body;
    const adLocationSnapShot = await client.db(dbName).collection("adLocations").findOne({ locationId: parseInt(EditAdLocationId) });
    
    // console.log( idHighest);
    try {
        
        const updateData = {
            adForm: EditAdLocationForm ? EditAdLocationForm : adLocationSnapShot.adForm,
            locationType: EditLocationType ? EditLocationType : adLocationSnapShot.locationType,
            idQuan: EditAdLocationDistrict ? EditAdLocationDistrict : adLocationSnapShot.idQuan,
            idPhuong: EditAdLocationWard ? EditAdLocationWard : adLocationSnapShot.idPhuong,
            address: EditAdLocationAddress ? EditAdLocationAddress : adLocationSnapShot.address,
            latitude: parseFloat(EditAdLocationLattitude ? EditAdLocationLattitude : adLocationSnapShot.latitude),
            longitude: parseFloat(EditAdLocationLongtitude ? EditAdLocationLongtitude : adLocationSnapShot.longitude),
        };

        // await adLocationSnapShot.insertOne(updateData);
        await client.db(dbName).collection("adLocations").updateOne({ locationId: parseInt(EditAdLocationId) }, { $set: updateData });

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    //res.send("Documents updated successfully");

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


