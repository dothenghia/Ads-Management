const controller = {}
const currentPage = 0;

const jwt = require("jsonwebtoken");
const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';
// Firebase
const admin = require("../../../config/firebaseAdmin");

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
    const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
    const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();
    
    // Extract data from retrieved snapshots
    let Ad = [];
    adSnapshot.forEach((doc) => {
        Ad.push(doc);
    });
    let AdType = []; let AdForm = []; let LocationType = [];
    let adTypeId = []; let adFormId = []; let locationTypeId = [];
    let AdLocation = [];
    adLocationSnapshot.forEach((doc) => {
        let data = doc;

        if (data.adList.length > 0) {
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

            AdLocation.push(data);
        }
    });

    // Filters
    let filterAdFormId = req.query.adFormId;
    if (filterAdFormId)
        AdLocation = AdLocation.filter((loc) => loc.adForm == filterAdFormId);
    let filterAdTypeId = req.query.adTypeId;
    if (filterAdTypeId)
        AdLocation = AdLocation.filter((loc) => loc.adType == filterAdTypeId);
    let filterLocationTypeId = req.query.locationTypeId;
    if (filterLocationTypeId)
        AdLocation = AdLocation.filter((loc) => loc.locationType == filterLocationTypeId);

    res.render("partials/screens/so/index", {
        "current": currentPage,
        "ad": Ad,
        "roleInfo": currentRoleInfo,
        "adType": AdType,
        "adForm": AdForm,
        "locationType": LocationType,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/ttbqc";
        }
    });
}

controller.delete = async (req, res) => {
    try {
        let id = req.params.id;

        // Delete document
        const result = await client.db(dbName).collection("ads").deleteOne({adId: parseInt(id)});
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

controller.add = async (req, res) => {

    const adSnapshot = client.db(dbName).collection("ads");
    let idHighest = parseInt( (await adSnapshot.find({}).sort({adId:-1}).limit(1).toArray())[0].adId );
    let adId = parseInt(generateADId());
    // console.log(req.body.data);
    // console.log(req.body.thumbnails);
    try {
        let thumbnails = Array();
        req.body.thumbnails.forEach((thumbnail) => {
            // console.log(thumbnail);
            thumbnails.push(thumbnail);
        });
        let {reportId, size, contractStartDate, contractEndDate, adName} = req.body.data;
        let newData = {
            adId: adId,
            reportId: reportId,
            contractStartDate: new Date(contractStartDate),
            contractEndDate: new Date(contractEndDate),
            size: size,
            name: adName,
            thumbnails: thumbnails
        }
    
        const result = await adSnapshot.insertOne(newData); //upsert = update and insert
        if (result.insertedId != null)
            res.send(adId.toString());
    }
    catch (error) {
        console.log(error)
        res.send("Create error");
    }

}

controller.edit = async (req, res) => {

    const adSnapshot = client.db(dbName).collection("ads");
    // console.log("Data: ",req.body.data);
    // console.log("Thumbnails: ",req.body.thumbnails);
    try {
        let thumbnails = null;
        if (req.body.thumbnails != null) {
            thumbnails = Array();
            req.body.thumbnails.forEach((thumbnail) => {
                // console.log(thumbnail);
                thumbnails.push(thumbnail);
            });
        } else {
            const thumb = await adSnapshot.findOne({ adId: parseInt(req.body.data.adId)});
            thumbnails = thumb.thumbnails;
        }
        
        // console.log("Thumbnail:" , thumbnails);
        let {newSize, newAdName} = req.body.data;
        let updateData = {
            size: newSize,
            name: newAdName,
            thumbnails: thumbnails
        }
    
        const result = await adSnapshot.findOneAndUpdate({ adId: parseInt(req.body.data.adId) }, { $set: updateData }); //upsert = update and insert
        res.send("Edit success");
    }
    catch (error) {
        console.log(error)
        res.send("Edit error");
    }
}

function generateADId() {
    // Lấy ngày tháng năm và thời gian hiện tại
    let currentDate = new Date();
    let day = currentDate.getDate().toString().padStart(2, '0');
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    let year = currentDate.getFullYear().toString();
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');
    // let milliseconds = currentDate.getMilliseconds();
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
module.exports = controller;


