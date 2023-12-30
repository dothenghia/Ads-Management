const controller = {}
const currentPage = 2;

const jwt = require("jsonwebtoken");
const {client}  = require("../../../config/mongodbConfig");
const fs = require("fs");
const axios = require("axios");

const dbName = 'Ads-Management';
const mapboxToken = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';


controller.show = async (req, res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentRoleInfo = { accountType: decoded.accountType, areaId: decoded.areaId, areaName: decoded.areaName, name: decoded.name };

    try {

        // Get latest snapshot of requested Firebase collections
        const reportSnapshot = await client.db(dbName).collection("reports").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();
        
         // Get local data for HCM city's wards and districts
        const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
        let areas = JSON.parse(dataFile);
        
        // Extract data from retrieved snapshots
        let ReportType = []; let ReportForm = []; let Status = [];
        let reportTypeId = []; let reportFormId = []; let statusId = [];
        let Report = []; let AdArea = {};
        await Promise.all(reportSnapshot.map(async (doc) => {
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

            // Update later so that the list order isn't changed
            if (data.reportType == "ddbk") {
                // Edit address based on coordinates
                let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude},${data.latitude}.json?access_token=${mapboxToken}`;
                let fetchRawResult = await axios.get(url)
                let fetchResult = fetchRawResult.data;
                data.locationId = "Gần " + fetchResult.features[0].text;
            }
        }));
        let Ad = [];
        adSnapshot.forEach((doc) => {
            Ad.push(doc);
        });
        let AdLocation = [];
        adLocationSnapshot.forEach((doc) => {
            let data = doc;

            let docDistrict = areas.districts.filter((district) => district.idQuan == doc.idQuan)[0];
            if (!(docDistrict.idQuan in AdArea))
                AdArea[docDistrict.idQuan] = {name: docDistrict.name, idQuan: docDistrict.idQuan, wards: {}}
            else {
                let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];

                if (!(docWard.idPhuong in AdArea[docDistrict.idQuan]))
                    AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong, adLocations: []}
                    AdArea[docDistrict.idQuan].wards[docWard.idPhuong].adLocations.push({address: doc.address, locationId: doc.locationId});
            }

            AdLocation.push(data);
        });

        // Convert adArea to stringify-able format
        let temp = [];
        let i = 0;
        for (let districtKey in AdArea) {
            if (AdArea.hasOwnProperty(districtKey)) {
                temp.push(AdArea[districtKey]);
            }
            
            let wardTemp = [];
            for (let wardKey in temp[i].wards) {
                if (temp[i].wards.hasOwnProperty(wardKey)) {
                    wardTemp.push(temp[i].wards[wardKey]);
                }
            }
            temp[i].wards = wardTemp;
            i++;
        }
        AdArea = temp;

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
            "roleInfo": currentRoleInfo,
            "reportType": ReportType,
            "reportForm": ReportForm,
            "status": Status,
            "report": Report,
            "ad": Ad,
            "adArea": AdArea,
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


controller.delete = async (req, res) => {
    try {
        let id = req.params.id;

        // Delete document
        const result = await client.db(dbName).collection("reports").findOneAndUpdate({reportId: parseInt(id)}, { $set: { delete: true } });
        
        // Check if the document was found and deleted
        if (result == null) {
            return res.status(404).send("Document not found");
        }
    
        res.send("Change accepted!");
    }
    catch (error) {
        res.send("Change acceptance error!");
    }
}


module.exports = controller;