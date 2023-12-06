const controller = {}

const currentPage = 1;

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
    const Ad = [];
    adSnapshot.forEach((doc) => {
        Ad.push(doc.data());
    });
    const AdLocation = [];
    adLocationSnapshot.forEach((doc) => {
        AdLocation.push(doc.data());
    });

    res.render("partials/screens/phuong/index", {
        "current": currentPage,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/phuong/thongtinquangcao";
        }
    });
}

module.exports = controller;