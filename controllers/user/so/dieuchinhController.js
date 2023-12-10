const controller = {}
const currentPage = 5;

const admin = require("../../../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();

controller.show = async (req, res) => {
    try {
        // Get latest snapshot of requested Firebase collections
        const changeReqRef = db.collection("changeReqs");
        const changeReqSnapshot = await changeReqRef.get();
        const adRef = db.collection("ads");
        const adSnapshot = await adRef.get();
        
        // Extract data from retrieved snapshots
        let Reason = []; let Status = [];
        let reasonId = []; let statusId = [];
        let ChangeReq = [];
        changeReqSnapshot.forEach((doc) => {
            let data = doc.data();

            if (!reasonId.includes(data.reason)) {
                reasonId.push(data.reason);
                Reason.push({value: data.reason});
            }

            if (!statusId.includes(data.status)) {
                statusId.push(data.status);
                Status.push({value: data.status});
            }

            ChangeReq.push(data);
        });
        let Ad = [];
        adSnapshot.forEach((doc) => {
            Ad.push(doc.data());
        });

        // Filters
        let filterReasonId = req.query.reasonId;
        if (filterReasonId)
            ChangeReq = ChangeReq.filter((req) => req.reason == filterReasonId);
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            ChangeReq = ChangeReq.filter((req) => req.status == filterStatusId);

        res.render("partials/screens/so/index", {
            "current": currentPage,
            "reason": Reason,
            "status": Status,
            "changeReq": ChangeReq,
            "ad": Ad,
            body: function() {
                return "screens/so/dieuchinh";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.delete = async (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    
    
    const changeReqRef = db.collection("changeReqs").where("changeReqId", "==", id).get();
    const updatePromise = []

    changeReqRef.forEach((doc) => {
        const updateId = {
            changeReqId: -1
        }

        updatePromise.push(doc.ref.update(updateId));
    });

    await Promise.all(updatePromise);
    res.send("Deleted");
}

module.exports = controller;