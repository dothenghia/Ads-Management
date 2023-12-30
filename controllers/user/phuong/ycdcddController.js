const controller = {}
const currentPage = 3;

const jwt = require("jsonwebtoken");
// Firebase
const admin = require("../../../config/firebaseAdmin");
// MongoDB
const {client}  = require("../../../config/mongodbConfig");
const fs = require("fs");
const dbName = 'Ads-Management';

controller.show = async (req, res) => {
    try {
        // Get current account
        const token = req.cookies.jwtToken;
        const decoded = await jwt.verify(token, "suffering");
        let currentAccount = { accountType: decoded.accountType, idQuan: decoded.idQuan, idPhuong: decoded.idPhuong, areaName: decoded.areaName, name: decoded.name };
    
        // Get current page's data
        const changeLocReqSnapshot = await client.db(dbName).collection("changeLocReqs").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

        // Get local data for HCM city's wards and districts
        const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
        let areas = JSON.parse(dataFile);
        
        // Extract data from retrieved snapshots
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
            
            AdArea[docDistrict.idQuan].wards[docWard.idPhuong].adLocations.push(doc);

            AdLocation.push(data);
        });

        let Reason = []; let Status = [];
        let reasonId = []; let statusId = [];
        let ChangeLocReq = [];
        changeLocReqSnapshot.forEach((doc) => {
            let data = doc;

            if (!reasonId.includes(data.reason)) {
                reasonId.push(data.reason);
                Reason.push({value: data.reason});
            }

            if (!statusId.includes(data.status)) {
                statusId.push(data.status);
                Status.push({value: data.status});
            }

            // Check if matching area before extracting
            //idQuan
            let idQuan = currentAccount.idQuan;
            // idPhuong
            let idPhuong = currentAccount.idPhuong;
            for (loc in AdLocation) {
                let locDetail = AdLocation[loc];

                if (locDetail.locationId == doc.oldLocationId && locDetail.idQuan == idQuan && locDetail.idPhuong == idPhuong) {
                    ChangeLocReq.push(data);
                    break;
                }
            }
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
        let filterReasonId = req.query.reasonId;
        if (filterReasonId)
            ChangeLocReq = ChangeLocReq.filter((req) => req.reason == filterReasonId);
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            ChangeLocReq = ChangeLocReq.filter((req) => req.status == filterStatusId);

        res.render("partials/screens/phuong/index", {
            "current": currentPage,
            "account": currentAccount,
            "reason": Reason,
            "status": Status,
            "changeLocReq": ChangeLocReq,
            "adArea": AdArea,
            "adLocation": AdLocation,
            body: function() {
                return "screens/phuong/yeucaudieuchinhdd";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.createChangeReq = async (req, res) => {
    const changeLocReqSnapshot = client.db(dbName).collection("changeLocReqs");
    let changeLocReqHighest = (await changeLocReqSnapshot.find({}).sort({changeLocReqId:-1}).limit(1).toArray())[0].changeLocReqId
    async function pushData(req) {
        let newData = {
            date: new Date(),
            reason: req.body.ChangeLocReqReason,
            changeLocReqId: changeLocReqHighest + 1,
            senderRole: 1,
            oldLocationId: parseInt(req.body.newChangeLocReqId),
            status: 0,
            new: {
                adForm: req.body.newChangeLocReqNewAdForm,
                adType: req.body.newChangeLocReqNewAdType,
                locationType: req.body.newChangeLocReqNewLocationType,
            }
        }
    
        const result = await changeLocReqSnapshot.insertOne(newData); //upsert = update and insert
        if (result.insertedId != null)
            res.redirect("/phuong/yeucaudieuchinhdd");
    }

    try {
        pushData(req);
    }
    catch (error) {
        console.log(error)
        res.send("Create error");
    }
}

module.exports = controller;