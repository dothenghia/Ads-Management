const controller = {}
const currentPage = 8;

const jwt = require("jsonwebtoken");
const {client}  = require("../../../config/mongodbConfig");
const fs = require("fs");
const dbName = 'Ads-Management';
// Firebase
const admin = require("../../../config/firebaseAdmin");
const {hashPassword} = require("../../../config/bcryptConfig");

controller.delete = async (req, res) => {
    try {
        let id = req.params.id;

        // Delete document
        const result = await client.db(dbName).collection("accounts").findOneAndUpdate({_id: id}, { $set: { delete: true } });
        
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

controller.show = async (req, res) => {
     //upsert = update and insert
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
    let currentAccount = { accountType: decoded.accountType, idQuan: decoded.idQuan, idPhuong: decoded.idPhuong, areaName: decoded.areaName, name: decoded.name, avatar: decoded.avatar };
    

    // console.log("currentRoleInfo:", currentRoleInfo);
    try {
        
        //const result = await client.db(dbName).collection("accounts").updateMany({}, { $set: { avatar: Array() } });
        // console.log(req.user);
        const accountSnapshot = await client.db(dbName).collection("accounts").find({}).toArray();

        let Account = []; 
        accountSnapshot.forEach((doc) => {
            let data = doc;
            Account.push(data);
        }); 
        Account = Account.filter((user) =>  user.role == req.user.accountType && user.area == req.user.areaName);
        // console.log("Account:", Account);
        
        // console.log("account:",Account);
        let avatar = Account[0].avatar ? Account[0].avatar[0] : "";

        // Render navbar of specific role
        let role;
        switch (parseInt(currentRoleInfo.accountType)) {
            case 1: 
                role = "phuong";
                break;
            case 2: 
                role = "quan";
                break;
            case 3:
                role = "so";
                break;
        }
        res.render(`partials/screens/${role}/index`, {
            "current": currentPage,
            "roleInfo": currentRoleInfo,
            "role": role,
            "avatar": avatar,
            "account": currentAccount,
            "accountInfo": Account[0],
            body: function() {
                return "screens/chung/thongtincanhan";
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
    
}

controller.edit = async (req, res) => {
    let { id, name, phone, newPassword, fbID, email} = req.body;
    // console.log(req);
    // console.log(id, name, phone, newPassword, fbID, email);
    try {
        const accountSnapshot = await client.db(dbName).collection("accounts").findOne({ _id: id });
        
        const updateData = {
            name: name ? name : accountSnapshot.name,
            phone: phone ? phone : accountSnapshot.phone,
            hashedpassword: newPassword ? await hashPassword(newPassword) : accountSnapshot.hashedpassword,
            fbID: fbID ? fbID : accountSnapshot.fbID,
            email: email ? email : accountSnapshot.email,
        };

        //update
        await client.db(dbName).collection("accounts").updateOne({ _id: id }, { $set: updateData });

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

controller.editAvatar = async (req, res) => {

    let file = req.file;
    let bucket = admin.storage().bucket("firstproject-90f9e.appspot.com");
    let { id } = req.body;
    let extension;
    let avatar;
    // console.log(req.file);
    // console.log("Id:", id);
    try {
        const accountSnapshot = await client.db(dbName).collection("accounts").findOne({ _id: id });
        
        if (file.mimetype.endsWith("png"))
                extension = "png";
            else if (file.mimetype.endsWith("jpeg"))
                extension = "jpeg";
            else
                extension = "jpg";

        // Upload file to firebase storage
        let temp = bucket.file("avatar/" + (id) + `/${accountSnapshot.name}.` + extension);
        await temp.save(file.buffer, {contentType: file.mimetype});

        // Get the download url
        let signedURL = await temp.getSignedUrl({action: "read", expires: '2024-10-24'});
        avatar = signedURL;

        // Assign avatar
        const updateData = {
            avatar: avatar
        };

        console.log("avatar:", avatar);
        //update
        await client.db(dbName).collection("accounts").updateOne({ _id: id }, { $set: updateData });

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    //res.send("Documents updated successfully");
}

module.exports = controller;