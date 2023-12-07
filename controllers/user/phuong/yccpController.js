const controller = {}
const currentPage = 4;

const admin = require("../../../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();

controller.show = async (req, res) => {
    try {
        // Get latest snapshot of requested Firebase collections
        const permissionReqRef = db.collection("permissionReqs");
        const permissionReqSnapshot = await permissionReqRef.get();
        const adRef = db.collection("ads");
        const adSnapshot = await adRef.get();
        const adLocationRef = db.collection("adLocations");
        const adLocationSnapshot = await adLocationRef.get();
        
        // Extract data from retrieved snapshots
        const Company = [];
        let companyId = [];
        const PermissionReq = [];
        permissionReqSnapshot.forEach((doc) => {
            let data = doc.data();

            if (!companyId.includes(data.co.id)) {
                companyId.push(data.co.id);
                Company.push(data.co);
            }

            PermissionReq.push(data);
        });
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
            "company": Company,
            "permissionReq": PermissionReq,
            "ad": Ad,
            "adLocation": AdLocation,
            body: function() {
                return "screens/phuong/yeucaucapphep";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = controller;