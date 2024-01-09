const controller = {}
const currentPage = 2;

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
        let currentAccount = { accountType: decoded.accountType, idQuan: decoded.idQuan, areaName: decoded.areaName, name: decoded.name, avatar: decoded.avatar };
        // Get current account's wardlist
        let wardList;
        if (currentAccount.idQuan == "quan_1") {
            wardList = [
                {value: "phuong_nguyen_cu_trinh", name: "Phường Nguyễn Cư Trinh"},
                {value: "phuong_cau_kho", name: "Phường Cầu Kho"}
            ];
        }
        else {
            wardList = [
                {value: "phuong_04", name: "Phường 4"},
                {value: "phuong_03", name: "Phường 3"}
            ];
        }
    
        // Get current page's data
        const changeReqSnapshot = await client.db(dbName).collection("changeReqs").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

        // Get local data for HCM city's wards and districts
        const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
        let areas = JSON.parse(dataFile);
        
        // Extract data from retrieved snapshots
        let Reason = []; let Status = [];
        let reasonId = []; let statusId = [];
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

            if (!(docWard.idPhuong in AdArea[docDistrict.idQuan].wards)) 
                AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong, ads: []};
            
            for (ad in data.adList) {
                let adId = data.adList[ad].adId;
                
                let adObject = Ad.filter((currentAd) => currentAd.adId == adId)[0];
                AdArea[docDistrict.idQuan].wards[docWard.idPhuong].ads.push(adObject);
            }

            AdLocation.push(data);
        });
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

            // Check if matching area before extracting
            //idQuan
            let idQuan = currentAccount.idQuan;
            for (loc in AdLocation) {
                let locDetail = AdLocation[loc];

                let isFound = false;
                for (ad in locDetail.adList) {
                    let adDetail = locDetail.adList[ad];
                    if (adDetail.adId == data.oldAdId && locDetail.idQuan == idQuan) {
                        ChangeReq.push(data);
                        isFound = true;
                        break;
                    }
                }
                if (isFound) break;
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
            ChangeReq = ChangeReq.filter((req) => req.reason == filterReasonId);
        let filterWardId = req.query.wardId;
        if (filterWardId) {
            ChangeReq = ChangeReq.filter((req) => {
                for (loc in AdLocation) {
                    let adList = AdLocation[loc].adList;

                    for (ad in adList) {
                        let adId = adList[ad].adId;

                        if (adId == req.oldAdId && AdLocation[loc].idPhuong == filterWardId) return true;
                    }
                }
                return false;
            });
        }
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            ChangeReq = ChangeReq.filter((req) => req.status == filterStatusId);

        res.render("partials/screens/quan/index", {
            "current": currentPage,
            "account": currentAccount,
            "reason": Reason,
            "status": Status,
            "changeReq": ChangeReq,
            "ward": wardList,
            "ad": Ad,
            "adArea": AdArea,
            "adLocation": AdLocation,
            body: function() {
                return "screens/quan/yeucaudieuchinh";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.createChangeReq = async (req, res) => {
    const changeReqSnapshot = client.db(dbName).collection("changeReqs");
    let changeReqHighest = (await changeReqSnapshot.find({}).sort({changeReqId:-1}).limit(1).toArray())[0].changeReqId
        console.log(req.files)

    let bucket = admin.storage().bucket("firstproject-90f9e.appspot.com");
    let i = 0;
    let extension;

    async function pushData(req, thumbnails) {
        let newData = {
            date: new Date(),
            reason: req.body.ChangeReqReason,
            changeReqId: changeReqHighest + 1,
            senderRole: 1,
            oldAdId: parseInt(req.body.newChangeReqId),
            status: 0,
            new: {
                name: req.body.newChangeReqNewName,
                size: req.body.newChangeReqNewSize,
                thumbnails: thumbnails
            },
            delete: false
        }
    
        const result = await changeReqSnapshot.insertOne(newData); //upsert = update and insert
        if (result.insertedId != null)
            res.redirect("/quan/yeucaudieuchinhqc");
    }

    try {
        let thumbnails = Array();
        let i = 0;
        let n = req.files ? req.files.length : 0;

        if (n > 0) {
            let i = 0;

            for (const file of req.files) {
                let extension;

                if (file.mimetype.endsWith("png"))
                    extension = "png";
                else if (file.mimetype.endsWith("jpeg"))
                    extension = "jpeg";
                else
                    extension = "jpg";

                // Upload the thumbnails to storage
                let temp = bucket.file("yeucaudieuchinhqc/" + (changeReqHighest + 1) + "/thumbnail" + i + "." + extension);
                await temp.save(file.buffer, { contentType: file.mimetype });

                let signedURL = await temp.getSignedUrl({ action: "read", expires: '2024-10-24' });
                thumbnails.push({ url: signedURL[0] });

                i = i + 1;

                if (i == req.files.length) {
                    pushData(req, thumbnails);
                }
            }
        }
        else pushData(req, thumbnails);
    }
    catch (error) {
        console.log(error)
        res.send("Create error");
    }
}

module.exports = controller;