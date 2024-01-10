const controller = {};

const currentPage = 1;

// Firebase
const admin = require("../../../config/firebaseAdmin");

const jwt = require("jsonwebtoken")
const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const fs = require("fs");
const axios = require("axios");

controller.show = async (req, res) => {
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
    const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
    const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

    // Get local data for HCM city's wards and districts
    const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
    let areas = JSON.parse(dataFile);

    // Extract data from retrieved snapshots
    let AdArea = {};
    
    // Extract data from retrieved snapshots
    let Ad = [];
    adSnapshot.forEach((doc) => {
        Ad.push(doc);
    });
    let AdType = []; let AdForm = []; let LocationType = [];
    let adTypeId = []; let adFormId = []; let locationTypeId = [];
    let AdLocation = [];
    adLocationSnapshot.forEach((doc) => {
        let data = doc;

        if (!locationTypeId.includes(data.locationType)) {
            locationTypeId.push(data.locationType);
            LocationType.push({value: data.locationType});
        }

        if (!adFormId.includes(data.adForm)) {
            adFormId.push(data.adForm);
            AdForm.push({value: data.adForm});
        }

        if (!adTypeId.includes(data.adType)) {
            adTypeId.push(data.adType);
            AdType.push({value: data.adType});
        }

        let docDistrict = areas.districts.filter((district) => district.idQuan == doc.idQuan)[0];
        if (!(docDistrict.idQuan in AdArea))
            AdArea[docDistrict.idQuan] = {name: docDistrict.name, idQuan: docDistrict.idQuan, wards: {}};
        
        let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];

        if (!(docWard.idPhuong in AdArea[docDistrict.idQuan].wards)) {
            AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong, adLocations: []}
        }
        
        AdArea[docDistrict.idQuan].wards[docWard.idPhuong].adLocations.push({address: doc.address, locationId: doc.locationId});

        // Check if matching area before extracting
        // idPhuong
        let idQuan = currentAccount.idQuan;
        if (data.idQuan == idQuan) AdLocation.push(data);
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
    //console.log(AdArea);

    // Filters
    let filterAdFormId = req.query.adFormId;
    if (filterAdFormId)
        AdLocation = AdLocation.filter((loc) => loc.adForm == filterAdFormId);
    let filterAdTypeId = req.query.adTypeId;
    if (filterAdTypeId)
        AdLocation = AdLocation.filter((loc) => loc.adType == filterAdTypeId);
    let filterLocationTypeId = req.query.locationTypeId;
    if (filterLocationTypeId)
        AdLocation = AdLocation.filter((loc) => loc.locationType == filterLocationTypeId);
    let filterWardId = req.query.wardId;
    if (filterWardId)
        AdLocation = AdLocation.filter((loc) => loc.idPhuong == filterWardId);

    res.render("partials/screens/quan/index", {
        "current": currentPage,
        "account": currentAccount,
        "ad": Ad,
        "adType": AdType,
        "adForm": AdForm,
        "ward": wardList,
        "locationType": LocationType,
        "adArea": AdArea,
        "adLocation": AdLocation,
        body: function() {
            return "screens/quan/thongtinquangcao";
        }
    });
}

controller.createPermissionReq = async (req, res) => {
    const permissionReqSnapshot = client.db(dbName).collection("permissionReqs");
    let permissionReqHighest = (await permissionReqSnapshot.find({}).sort({permissionReqId:-1}).limit(1).toArray())[0].permissionReqId

    let bucket = admin.storage().bucket("firstproject-90f9e.appspot.com");
    let i = 0;
    let extension;

    async function pushData(req, thumbnails) {
        let newData = {
            co: {
                email: req.body.newPermissionReqEmail,
                name: req.body.newPermissionReqCoName,
                phone: req.body.newPermissionReqPhone
            },
            content: req.body.newPermissionReqContent,
            enddate: req.body.newPermissionReqEndDate,
            locationId: parseInt(req.body.newPermissionReqAddress),
            name: req.body.newPermissionReqAdName,
            permissionReqId: permissionReqHighest + 1,
            size: req.body.newPermissionReqSize,
            startdate: req.body.newPermissionReqStartDate,
            content: req.body.ReportContent,
            status: 0,
            thumbnails: thumbnails
        }
    
        const result = await permissionReqSnapshot.insertOne(newData); //upsert = update and insert
        if (result.insertedId != null)
            res.redirect("/quan/yeucaucapphep");
    }

    try {
        let thumbnails = Array();
        let i = 0;
        let n = req.files.length;

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
                let temp = bucket.file("yeucaudieuchinhqc/" + (permissionReqHighest + 1) + "/thumbnail" + i + "." + extension);
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