const controller = {}
const currentPage = 0;


controller.delete = (req, res) => {
    let IDs = isNaN(req.params.id) ? 0 : req.params.id.split('.');

    IDs = IDs.map((IDs) => {
        return parseInt(IDs);
    });
    
    changeId('adlocation', IDs);
    res.send("Deleted");
}


const admin = require("../../../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();

controller.show = async (req, res) => {
    // Get latest snapshot of requested Firebase collections
    const adRef = db.collection("ads");
    const adSnapshot = await adRef.get();
    const adLocationRef = db.collection("adLocations");
    const adLocationSnapshot = await adLocationRef.get();
    
    // Extract data from retrieved snapshots
    let Ad = [];
    adSnapshot.forEach((doc) => {
        Ad.push(doc.data());
    });
    let AdType = []; let AdForm = []; let LocationType = [];
    let adTypeId = []; let adFormId = []; let locationTypeId = [];
    let AdLocation = [];
    adLocationSnapshot.forEach((doc) => {
        let data = doc.data();

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
        "adType": AdType,
        "adForm": AdForm,
        "locationType": LocationType,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/ttqc";
        }
    });
}

module.exports = controller;