const controller = {}
const currentPage = 4;

// MongoDB
const {client}  = require("../../../config/mongodbConfig");
const fs = require("fs");
const dbName = 'Ads-Management';

controller.show = async (req, res) => {
    try {
        // Get latest snapshot of requested MongoDB collections
        const permissionReqSnapshot = await client.db(dbName).collection("permissionReqs").find({}).toArray();
        const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

        // Get local data for HCM city's wards and districts
        const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
        let areas = JSON.parse(dataFile);
        
        // Extract data from retrieved snapshots
        let Company = []; let Status = []; let AdArea = {};
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

            PermissionReq.push(data);
        });
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
        console.log(AdArea.quan_5.wards);
        // console.log(AdArea.quan_5.wards.phuong_04.adLocations);

        // Filters
        let filterCoId = req.query.coId;
        if (filterCoId)
            PermissionReq = PermissionReq.filter((req) => req.co.name == filterCoId);
        let filterStatusId = req.query.statusId;
        if (filterStatusId)
            PermissionReq = PermissionReq.filter((req) => req.status == filterStatusId);

        res.render("partials/screens/so/index", {
            "current": currentPage,
            "company": Company,
            "status": Status,
            "permissionReq": PermissionReq,
            "ad": Ad,
            "adArea": AdArea,
            "adLocation": AdLocation,
            body: function() {
                return "screens/so/capphep";
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

controller.delete = async (req, res) => {
    try {
        let id = req.params.id;

        
        // Delete document
        const result = await client.db(dbName).collection("permissionReqs").findOneAndUpdate({permissionReqId: parseInt(id)}, { $set: { delete: true } });
        //const result = await client.db(dbName).collection("permissionReqs").findOneAndDelete({permissionReqId: parseInt(id)});

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