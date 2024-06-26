const controller = {}
const currentPage = 5;

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
        let currentAccount = { accountType: decoded.accountType, idQuan: decoded.idQuan, idPhuong: decoded.idPhuong, areaName: decoded.areaName, name: decoded.name, avatar: decoded.avatar };
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
        // Get latest snapshot of requested MongoDB collections
        const permissionReqSnapshot = await client.db(dbName).collection("permissionReqs").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

        // Get local data for HCM city's wards and districts
        const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
        let areas = JSON.parse(dataFile);
        
        // Extract data from retrieved snapshots
        let AdArea = {};

        let Ad = [];
        adSnapshot.forEach((doc) => {
            Ad.push(doc);
        });
        let AdLocation = [];
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
        let Company = []; let Status = [];
        let companyId = []; let statusId = []; 
        let PermissionReq = [];
        permissionReqSnapshot.forEach((doc) => {
            let data = doc;

            if (!companyId.includes(data.co.name)) {
                companyId.push(data.co.name);
                Company.push(data.co);
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

                if (locDetail.locationId == doc.locationId && locDetail.idQuan == idQuan) {
                    PermissionReq.push(data);
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
        //console.log(AdArea);

        // Filters
        let filterCoId = req.query.coId;
        if (filterCoId)
            PermissionReq = PermissionReq.filter((req) => req.co.name == filterCoId);
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            PermissionReq = PermissionReq.filter((req) => req.status == filterStatusId);
        let filterWardId = req.query.wardId;
        if (filterWardId)
            PermissionReq = PermissionReq.filter((req) => {
                for (loc in AdLocation) {
                    if (AdLocation[loc].idPhuong == filterWardId && req.locationId == AdLocation[loc].locationId) {
                        return true;
                    }
                }

                return false;
            });

        res.render("partials/screens/quan/index", {
            "current": currentPage,
            "account": currentAccount,
            "company": Company,
            "status": Status,
            "permissionReq": PermissionReq,
            "ward": wardList,
            "ad": Ad,
            "adArea": AdArea,
            "adLocation": AdLocation,
            body: function() {
                return "screens/quan/yeucaucapphep";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.deletePermissionReq = async (req, res) => {
    try {
        let id = req.params.id;

        const result = await client.db(dbName).collection("permissionReqs").findOneAndDelete({permissionReqId: parseInt(id)});

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