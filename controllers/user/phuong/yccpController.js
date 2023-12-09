const controller = {}
const currentPage = 4;

const admin = require("../../../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();

controller.show = async (req, res) => {
    try {
        // Get latest snapshot of requested Firebase collections
        const permissionReqRef = db.collection("permissionReqs");
        const permissionReqSnapshot = await permissionReqRef.get();
        const adRef = db.collection("ads");
        const adSnapshot = await adRef.get();
        const adLocationRef = db.collection("adLocations");
        const adLocationSnapshot = await adLocationRef.get();
        
        // Extract data from retrieved snapshots
        let Company = []; let Status = [];
        let companyId = []; let statusId = [];
        let PermissionReq = [];
        permissionReqSnapshot.forEach((doc) => {
            let data = doc.data();

            if (!companyId.includes(data.co.name)) {
                companyId.push(data.co.name);
                Company.push(data.co);
            }

            if (!statusId.includes(data.status)) {
                statusId.push(data.status);
                Status.push({value: data.status});
            }

            PermissionReq.push(data);
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
        let filterCoId = req.query.coId;
        if (filterCoId)
            PermissionReq = PermissionReq.filter((req) => req.co.name == filterCoId);
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            PermissionReq = PermissionReq.filter((req) => req.status == filterStatusId);

        res.render("partials/screens/phuong/index", {
            "current": currentPage,
            "company": Company,
            "status": Status,
            "permissionReq": PermissionReq,
            "ad": Ad,
            "adLocation": AdLocation,
            body: function() {
                return "screens/phuong/yeucaucapphep";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.deletePermissionReq = async (req, res) => {
    let id = req.params.id;

    // Initialize an array to store promises for each update operation
    const deletePromises = [];
    const permissionReqRef = await db.collection("permissionReqs").where("permissionReqId", "==", parseInt(id)).get();
    permissionReqRef.forEach((doc) => {
        deletePromises.push(doc.ref.delete());
    })
    
    try {
        // Wait for all delete operations to complete
        await Promise.all(deletePromises);
    
        res.send("Change accepted!");
    }
    catch (error) {
        res.send("Change acceptance error!");
    }
}

controller.createPermissionReq = async (req, res) => {
    const permissionReqRef = db.collection("permissionReqs");
    const permissionReqSnapshot = await permissionReqRef.get();
    let permissionReqCnt = permissionReqSnapshot.size;

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
            enddate: null,
            locationId: null,
            name: req.body.newPermissionReqAdName,
            permissionReqId: permissionReqCnt + 1,
            size: req.body.newPermissionReqSize,
            startdate: null,
            status: 0,
            thumbnails: thumbnails
        }
    
        await permissionReqRef.add(newData);
        res.redirect("/phuong/yeucaucapphep")
    }

    try {
        let thumbnails = Array();
        let i = 0;
        let n = req.files.length;
        await req.files.forEach(async (file) => {
            if (file.mimetype.endsWith("png"))
                extension = "png";
            else if (file.mimetype.endsWith("jpeg"))
                extension = "jpeg";
            else
                extension = "jpg";
            // Upload the thumbnails to storage
            let temp = bucket.file("yeucaucapphep/" + (permissionReqCnt + 1) + "/thumbnail" + i + "." + extension);
            await temp.save(file.buffer, {contentType: file.mimetype});
            
            let signedURL = await temp.getSignedUrl({action: "read", expires: '2024-10-24'});
            thumbnails.push({url: signedURL});
            
            i++;
            if (i == n) pushData(req, thumbnails);
        })
    }
    catch (error) {
        console.log(error)
        res.send("Create error");
    }
}

module.exports = controller;