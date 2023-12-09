const controller = {}
const currentPage = 1;

const admin = require("../../../config/firebaseAdmin");
const db = admin.firestore();

controller.show = async (req, res) => {
    try {
        // Get latest snapshot of requested Firebase collections
        const reportRef = db.collection("reports");
        const reportSnapshot = await reportRef.get();
        const adRef = db.collection("ads");
        const adSnapshot = await adRef.get();
        const adLocationRef = db.collection("adLocations");
        const adLocationSnapshot = await adLocationRef.get();
        
        // Extract data from retrieved snapshots
        let ReportType = []; let ReportForm = []; let Status = [];
        let reportTypeId = []; let reportFormId = []; let statusId = [];
        let Report = [];
        reportSnapshot.forEach((doc) => {
            let data = doc.data();

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
            Ad.push(doc.data());
        });
        let AdLocation = [];
        adLocationSnapshot.forEach((doc) => {
            AdLocation.push(doc.data());
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

        res.render("partials/screens/so/index", {
            "current": currentPage,
            "reportType": ReportType,
            "reportForm": ReportForm,
            "status": Status,
            "report": Report,
            "ad": Ad,
            "adLocation": AdLocation,
            body: function() {
                return "screens/so/baocao";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


controller.delete = async (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    

    const reportRef = await db.collection("reports").where("reportId", "==", id).get();
    const updatePromise = []
    reportRef.forEach((doc) => {
        const updateId = {
            reportId: -1
        }
    
        updatePromise.push(doc.ref.update(updateId));
    });

    await Promise.all(updatePromise);
    res.send("Deleted");
}


module.exports = controller;