const controller = {}
const currentPage = 3;

const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

controller.show = async (req, res) => {
    try {
        const changeReqSnapshot = await client.db(dbName).collection("changeReqs").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        
        // Extract data from retrieved snapshots
        let Reason = []; let Status = [];
        let reasonId = []; let statusId = [];
        let ChangeReq = [];
        changeReqSnapshot.forEach((doc) => {
            let data = doc;

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
            Ad.push(doc);
        });

        // Filters
        let filterReasonId = req.query.reasonId;
        if (filterReasonId)
            ChangeReq = ChangeReq.filter((req) => req.reason == filterReasonId);
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            ChangeReq = ChangeReq.filter((req) => req.status == filterStatusId);

        res.render("partials/screens/phuong/index", {
            "current": currentPage,
            "reason": Reason,
            "status": Status,
            "changeReq": ChangeReq,
            "ad": Ad,
            body: function() {
                return "screens/phuong/yeucaudieuchinhdd";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.acceptChange = async (req, res) => {
    try {
        let { id } = req.body;

        const result = await client.db(dbName).collection("changeReqs").findOneAndUpdate(
            {changeReqId: parseInt(id)}, 
            { $set: {status: 1} }
        );

        res.send("Change accepted!");
    }
    catch (error) {
        res.send("Change acceptance error!");
    }
}

controller.denyChange = async (req, res) => {
    try {
        let { id } = req.body;

        const result = await client.db(dbName).collection("changeReqs").findOneAndUpdate(
            {changeReqId: parseInt(id)}, 
            { $set: {status: 2} }
        );
    
        res.send("Change denied!");
    }
    catch (error) {
        res.send("Change denial error!");
    }
}

module.exports = controller;