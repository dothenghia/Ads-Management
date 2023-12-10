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
        let Company = [];
        let companyId = [];
        let PermissionReq = [];
        permissionReqSnapshot.forEach((doc) => {
            let data = doc.data();

            if (!companyId.includes(data.co.id)) {
                companyId.push(data.co.id);
                Company.push(data.co);
            }

            PermissionReq.push(data);
        });
        let Ad = [];
        adSnapshot.forEach((doc) => {
            Ad.push(doc.data());
        });
        let AdLocation = [];
        adLocationSnapshot.forEach((doc) => {
            AdLocation.push(doc.data());
        });

        // Filters
        let filterCoId = req.query.coId;
        if (filterCoId)
            PermissionReq = PermissionReq.filter((req) => req.co.id == filterCoId);

        res.render("partials/screens/so/index", {
            "current": currentPage,
            "company": Company,
            "permissionReq": PermissionReq,
            "ad": Ad,
            "adLocation": AdLocation,
            body: function() {
                return "screens/so/capphep";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.delete = async (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);

    const permissionReqRef = db.collection("permissionReqs").where("permissionReqId", "==", id).get();
    const updatePromise = []

    permissionReqRef.forEach((doc) => {
        const updateId = {
            permissionReqId: -1
        }

        updatePromise.push(doc.ref.update(updateId));
    });
    
    await Promise.all(updatePromise);
    res.send("Deleted");
}

module.exports = controller;