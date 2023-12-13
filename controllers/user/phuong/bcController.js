const controller = {}
const currentPage = 3;

const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

controller.show = async (req, res) => {
    try {
        const reportSnapshot = await client.db(dbName).collection("reports").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();
        
        // Extract data from retrieved snapshots
        let ReportType = []; let ReportForm = []; let Status = [];
        let reportTypeId = []; let reportFormId = []; let statusId = [];
        let Report = [];
        reportSnapshot.forEach((doc) => {
            let data = doc;

            if (!reportTypeId.includes(data.reportType)) {
                reportTypeId.push(data.reportType);
                ReportType.push({value: data.reportType});
            }
    
            if (!reportFormId.includes(data.reportForm)) {
                reportFormId.push(data.reportForm);
                ReportForm.push({value: data.reportForm});
            }
    
            if (!statusId.includes(data.status)) {
                statusId.push(data.status);
                Status.push({value: data.status});
            }

            Report.push(data);
        });
        let Ad = [];
        adSnapshot.forEach((doc) => {
            Ad.push(doc);
        });
        let AdLocation = [];
        adLocationSnapshot.forEach((doc) => {
            AdLocation.push(doc);
        });

        // Filters
        let filterReportTypeId = req.query.reportTypeId;
        if (filterReportTypeId)
            Report = Report.filter((loc) => loc.reportType == filterReportTypeId);
        let filterReportFormId = req.query.reportFormId;
        if (filterReportFormId)
            Report = Report.filter((loc) => loc.reportForm == filterReportFormId);
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            Report = Report.filter((loc) => loc.status == filterStatusId);

        res.render("partials/screens/phuong/index", {
            "current": currentPage,
            "reportType": ReportType,
            "reportForm": ReportForm,
            "status": Status,
            "report": Report,
            "ad": Ad,
            "adLocation": AdLocation,
            body: function() {
                return "screens/phuong/baocao";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.acceptChange = async (req, res) => {
    try {
        let { id, solution } = req.body;

        const result = await client.db(dbName).collection("reports").findOneAndUpdate(
            {reportId: parseInt(id)}, 
            { $set: {status: "Đã xử lý", solution: solution} }
        );

        res.send("Change accepted!");
    }
    catch (error) {
        res.send("Change acceptance error!");
    }
}

controller.denyChange = async (req, res) => {
    try {
        let { id, solution } = req.body;

        const result = await client.db(dbName).collection("reports").findOneAndUpdate(
            {reportId: parseInt(id)}, 
            { $set: {status: "Từ chối", solution: solution} }
        );
    
        res.send("Change denied!");
    }
    catch (error) {
        res.send("Change denial error!");
    }
}

module.exports = controller;