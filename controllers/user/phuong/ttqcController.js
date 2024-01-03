const controller = {};

const currentPage = 1;

const jwt = require("jsonwebtoken")
const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

controller.show = async (req, res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentAccount = { accountType: decoded.accountType, idQuan: decoded.idQuan, idPhuong: decoded.idPhuong, areaName: decoded.areaName, name: decoded.name, avatar: decoded.avatar };

    // Get current page's data
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

        // Check if matching area before extracting
        let idPhuong = currentAccount.idPhuong;
        let idQuan = currentAccount.idQuan;
        if (data.idQuan == idQuan && data.idPhuong == idPhuong) AdLocation.push(data);
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

    res.render("partials/screens/phuong/index", {
        "current": currentPage,
        "account": currentAccount,
        "ad": Ad,
        "adType": AdType,
        "adForm": AdForm,
        "locationType": LocationType,
        "adLocation": AdLocation,
        body: function() {
            return "screens/phuong/thongtinquangcao";
        }
    });
}

module.exports = controller;