 const controller = {}
const currentPage = 3;

const jwt = require("jsonwebtoken");
const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';
const fs = require("fs");
const {hashPassword} = require("../../../config/bcryptConfig");

controller.delete = async (req, res) => {
    try {
        let id = req.params.id;

        // Delete document
        const result = await client.db(dbName).collection("accounts").deleteOne({_id: id});

        // Check if the document was found and deleted
        if (result == null) {
            return res.status(404).send("Document not found");
        }
    
        res.send("Delete successfully!");
    }
    catch (error) {
        res.send("Delete error!");
    }
    
}

controller.show = async (req, res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentRoleInfo = { 
            accountType: decoded.accountType, 
            areaId: decoded.areaId, 
            areaName: decoded.areaName, 
            name: decoded.name,
            avatar: decoded.avatar
        };
    // console.log(currentRoleInfo);
     //upsert = update and insert
    try {
        
        const result = await client.db(dbName).collection("accounts").updateMany({}, { $unset: { delete: false } });
        // console.log(result);
        const accountSnapshot = await client.db(dbName).collection("accounts").find({}).toArray();
        const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

        // Get local data for HCM city's wards and districts
        const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
        let areas = JSON.parse(dataFile);

        let Account = []; let RoleID = []; let UserRole = [];
        let AdArea = {};
        accountSnapshot.forEach((doc) => {
            let data = doc;

            if (!RoleID.includes(data.role)) {
                RoleID.push(data.role);
                UserRole.push({value: data.role});
            }
            Account.push(data);
        });

        adLocationSnapshot.forEach((doc) => {
            
            // Lọc ra quận object trong JSON 
            let docDistrict = areas.districts.filter((district) => district.idQuan == doc.idQuan)[0];
            if (!(docDistrict.idQuan in AdArea)) {
                // Tạo mới quận object
                AdArea[docDistrict.idQuan] = {name: docDistrict.name, idQuan: docDistrict.idQuan, wards: {}}
                // Lọc ra phường object trong quận obj đã lọc
                let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];
                // Tạo mới phường object
                AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong}
            }
            else {
                let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];

                if (!(docWard.idPhuong in AdArea[docDistrict.idQuan]))
                    AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong}
                    
            }
        });
        //console.log(AdArea.quan_1.wards);
        // console.log(AdArea.quan_5.wards.phuong_04.adLocations);

        let filterRoleId = req.query.roleId;
        if (filterRoleId) {
            Account = Account.filter((req) =>  req.role == filterRoleId);
        }
        res.render("partials/screens/so/index", {
            "current": currentPage,
            "roleInfo": currentRoleInfo,
            "account": Account,
            "userRole": UserRole,
            "adArea": AdArea,
            body: function() {
                return "screens/so/nhansu";
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
    
}

controller.edit = async (req, res) => {
    let { id, name, phone, username, password, role, quanID, phuongID} = req.body;
    
    // console.log((await hashPassword(password)));
    
    try {
        const accountSnapshot = await client.db(dbName).collection("accounts").findOne({ _id: id });
        
        const updateData = {
            name: name ? name : accountSnapshot.name,
            phone: phone ? phone : accountSnapshot.phone,
            username: username ? username : accountSnapshot.username,
            role: role ? role : accountSnapshot.role,
            quan_id: quanID ? quanID : accountSnapshot.quan_id,
            phuong_id: phuongID ? phuongID :  accountSnapshot.phuong_id,
            hashedpassword: password ? await hashPassword(password) : accountSnapshot.hashedpassword,
        };

        await client.db(dbName).collection("accounts").updateOne({ _id: id }, { $set: updateData });

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

controller.add = async (req, res) => {
    let { newAccountName, newAccountPhone, newAccountEmail, newAccountUserName, newAccountPass, newAccountRole, newAccountDistrict, newAccountWard} = req.body;
    const accountSnapShot = client.db(dbName).collection("accounts");
    let idHighest = parseInt( (await accountSnapShot.find({}).sort({_id:-1}).limit(1).toArray())[0]._id );

    // console.log( idHighest);
    // Get local data for HCM city's wards and districts
    const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
    let areas = JSON.parse(dataFile);
    var areaName = "Sở";
    if (newAccountDistrict != "" && newAccountDistrict != null) {
        let docDistrict = areas.districts.filter((district) => district.idQuan == newAccountDistrict)[0];
        // console.log(docDistrict);
        areaName = docDistrict.name;
        if (newAccountWard != "" && newAccountWard != null) {
            let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == newAccountWard)[0];
            areaName = docWard.name + ", " + docDistrict.name;
            // console.log(docWard);
        }
    }
    try {
        
        const newData = {
            _id: (idHighest + 1).toString(),
            date: new Date(),
            area: areaName,
            fbID: "",
            microsoftEmail: "",
            name: newAccountName ? newAccountName : "No name",
            phone: newAccountPhone ? newAccountPhone : "No phone",
            username: newAccountUserName,
            email: newAccountEmail ? newAccountEmail : "No email",
            hashedpassword: await hashPassword(newAccountPass),
            role: newAccountRole ? newAccountRole : "3",
            quan_id: newAccountDistrict ? newAccountDistrict : "",
            phuong_id: newAccountWard ? newAccountWard : "",
        };

        await accountSnapShot.insertOne(newData);

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    //res.send("Documents updated successfully");

}

module.exports = controller;