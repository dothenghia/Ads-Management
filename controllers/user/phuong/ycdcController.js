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
        const adRef = db.collection("ads");
        const adSnapshot = await adRef.get();
        
        // Extract data from retrieved snapshots
        const ChangeReq = [];
        changeReqSnapshot.forEach((doc) => {
            let data = doc.data();

            ChangeReq.push(data);
        });
        const Ad = [];
        adSnapshot.forEach((doc) => {
            Ad.push(doc.data());
        });

        res.render("partials/screens/phuong/index", {
            "current": currentPage,
            "changeReq": ChangeReq,
            "ad": Ad,
            body: function() {
                return "screens/phuong/yeucaudieuchinh";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.acceptChange = async (req, res) => {
    let { id } = req.body;

    // Initialize an array to store promises for each update operation
    const updatePromises = [];
    const changeReqRef = await db.collection("changeReqs").where("changeReqId", "==", id).get();
    changeReqRef.forEach((doc) => {
        const updateData = {
            status: 1
        };

        updatePromises.push(doc.ref.update(updateData));
    })
    
    try {
        // Wait for all update operations to complete
        await Promise.all(updatePromises);
    
        res.send("Change accepted!");
    }
    catch (error) {
        res.send("Change acceptance error!");
    }
}

controller.denyChange = async (req, res) => {
    let { id } = req.body;

    // Initialize an array to store promises for each update operation
    const updatePromises = [];
    const changeReqRef = await db.collection("changeReqs").where("changeReqId", "==", parseInt(id)).get();
    changeReqRef.forEach((doc) => {
        const updateData = {
            status: 2
        };

        updatePromises.push(doc.ref.update(updateData));
    })
    
    try {
        // Wait for all update operations to complete
        await Promise.all(updatePromises);
    
        res.send("Change denied!");
    }
    catch (error) {
        res.send("Change denial error!");
    }
}

module.exports = controller;