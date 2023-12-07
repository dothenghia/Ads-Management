const controller = {}
const currentPage = 2;

const admin = require("../../../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();

controller.show = async (req, res) => {
    try {
        // Get latest snapshot of requested Firebase collections
        const changeReqRef = db.collection("changeReqs");
        const changeReqSnapshot = await changeReqRef.get();
        const adLocationRef = db.collection("adLocations");
        const adLocationSnapshot = await adLocationRef.get();
        
        // Extract data from retrieved snapshots
        // const Company = [];
        // let companyId = [];
        const ChangeReq = [];
        changeReqSnapshot.forEach((doc) => {
            let data = doc.data();

            ChangeReq.push(data);
        });
        const AdLocation = [];
        adLocationSnapshot.forEach((doc) => {
            AdLocation.push(doc.data());
        });

        res.render("partials/screens/phuong/index", {
            "current": currentPage,
            "changeReq": ChangeReq,
            "adLocation": AdLocation,
            body: function() {
                return "screens/phuong/yeucaudieuchinh";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = controller;