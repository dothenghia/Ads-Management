const controller = {}
const currentPage = 4;

const jwt = require("jsonwebtoken");
const {client}  = require("../../../config/mongodbConfig");
const adLocationsModel = require('../../../models/adLocationsModel');
const fs = require("fs");
const axios = require("axios");

const dbName = 'Ads-Management';
const mapboxToken = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kiznlh@gmail.com", // Your email address
      pass: "nqgj rhqz euoa wqyq", // Your email password or app password
    },
});

async function sendEmailToUser(userEmail, solution, status, locationID, latitude, longitude){
    var locationName;
    if (locationID && locationID != ""){
        const location = await adLocationsModel.findOne({locationID: locationID});
        locationName = location.address;
    }
    else{
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`;
        let fetchRawResult = await axios.get(url)
        let fetchResult = fetchRawResult.data;
        locationName = fetchResult.features[0].text;
    }
    var mailOptions = {
        from: "kiznlh@gmail.com",
        to: userEmail,
        subject: "Tình trạng báo cáo của bạn",
        html: `
              <p>Xin chào,</p>
              <p>Báo cáo của bạn về địa điểm <strong>${locationName}</strong> đã được xử lý như sau:</p>
              <p><strong>Tình trạng: </strong>${status}.</p>
              <p><strong>Cách thức xử lý: </strong>${solution}.</p>
              <p>Cám ơn bạn đã đóng góp ý kiến.</p>
          `,
      };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else {
        console.log("Email sent: " + info.response);
    }
    });
}
controller.show = async (req, res) => {
    try {
        // Get current account
        const token = req.cookies.jwtToken;
        const decoded = await jwt.verify(token, "suffering");
        let currentAccount = { accountType: decoded.accountType, idQuan: decoded.idQuan, areaName: decoded.areaName, name: decoded.name };
    
        // Get current page's data
        const reportSnapshot = await client.db(dbName).collection("reports").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();
        
        // Get local data for HCM city's wards and districts
        const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
        let areas = JSON.parse(dataFile);
        
        // Extract data from retrieved snapshots
        let ReportType = []; let ReportForm = []; let Status = []; let Location = [];
        let reportTypeId = []; let reportFormId = []; let statusId = []; let locationId = [];
        
        let Ad = [];
        adSnapshot.forEach((doc) => {
            Ad.push(doc);
        });

        let AdLocation = []; let AdArea = {};
        adLocationSnapshot.forEach((doc) => {
            let data = doc;

            let docDistrict = areas.districts.filter((district) => district.idQuan == doc.idQuan)[0];
            if (!(docDistrict.idQuan in AdArea))
                AdArea[docDistrict.idQuan] = {name: docDistrict.name, idQuan: docDistrict.idQuan, wards: {}};
            
            let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];

            if (!(docWard.idPhuong in AdArea[docDistrict.idQuan].wards)) {
                AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong, adLocations: []}
            }
            
            AdArea[docDistrict.idQuan].wards[docWard.idPhuong].adLocations.push({address: doc.address, locationId: doc.locationId});

            AdLocation.push(data);
        });

        let Report = [];
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

            // Check if matching area before extracting
            if (data.reportType != "ddbk") {
                //idQuan
                let idQuan = currentAccount.idQuan;
                for (loc in AdLocation) {
                    let locDetail = AdLocation[loc];

                    if (locDetail.locationId == doc.locationId && locDetail.idQuan == idQuan) {
                        Report.push(data);
                        break;
                    }
                }
            }
            else {

                // Update later so that the list order isn't changed
                // Edit address based on coordinates
                let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude},${data.latitude}.json?access_token=${mapboxToken}`;
                let fetchRawResult = await axios.get(url)
                let fetchResult = fetchRawResult.data;
                let quan = fetchResult.features[3].text;
                let quanObject = areas.districts.filter((district) => district.name == quan)[0];
                let idQuan = quanObject.idQuan;

                if (currentAccount.idQuan == idQuan) {
                    Report.push(data);
                }
                
                data.locationId = fetchResult.features[0].text;
            }
            
        }));

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

        res.render("partials/screens/quan/index", {
            "current": currentPage,
            "account": currentAccount,
            "reportType": ReportType,
            "reportForm": ReportForm,
            "status": Status,
            "report": Report,
            "ad": Ad,
            "adArea": AdArea,
            "adLocation": AdLocation,
            body: function() {
                return "screens/quan/baocao";
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
            {
                reportId: parseInt(id),
            }, 
            { $set: {status: "Đã xử lý", solution: solution} }
        );
        sendEmailToUser(result.email,solution,"Đã xử lý",result.locationId, result.latitude, result.longitude);
        

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
        sendEmailToUser(result.email,solution,"Từ chối",result.locationId, result.latitude, result.longitude);
        res.send("Change denied!");
    }
    catch (error) {
        res.send("Change denial error!");
    }
}

module.exports = controller;