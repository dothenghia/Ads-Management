const controller = {}
const currentPage = 5;

const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

controller.show = async (req, res) => {
    try {
        const changeReqSnapshot = await client.db(dbName).collection("changeReqs").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        
        // Extract data from retrieved snapshots
        let Reason = []; let Status = [];
        let reasonId = []; let statusId = []; let roleId = []
        let ChangeReq = []; let SenderRole = [];
        changeReqSnapshot.forEach((doc) => {
            let data = doc;

            if (!roleId.includes(data.senderRole)) {
                roleId.push(data.senderRole);
                SenderRole.push({value: data.senderRole});
            }
        
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
        let filterRoleId = req.query.roleId;
        if (filterRoleId) 
            ChangeReq = ChangeReq.filter((req) => req.senderRole == filterRoleId);
        res.render("partials/screens/so/index", {
            "current": currentPage,
            "reason": Reason,
            "status": Status,
            "changeReq": ChangeReq,
            "ad": Ad,
            "senderRole": SenderRole,
            body: function() {
                return "screens/so/dieuchinh";
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

controller.delete = async (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    
    res.send("Deleted");
}

module.exports = controller;