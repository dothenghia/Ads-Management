const controller = {}
const currentPage = 0;


const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';
const fs = require("fs");

controller.show = async (req, res) => {
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
        "locationType": LocationType,
        "adArea": docDistrict,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/ttdqc";
        }
    });
}

controller.add = async (req, res) => {
    let { newAdLocationForm, newLocationType, newAdLocationDistrict, newAdLocationWard, newAdLocationAddress } = req.body;
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
            latitude: "",
            longitude: "",
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


