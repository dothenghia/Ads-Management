const controller = {}
const currentPage = 7;

const {client}  = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';
const fs = require("fs");
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
    try {
        
        //const result = await client.db(dbName).collection("reports").updateMany({}, { $set: { delete: false } });
        console.log(req.user);
        const accountSnapshot = await client.db(dbName).collection("accounts").find({}).toArray();

        let Account = []; 
        accountSnapshot.forEach((doc) => {
            let data = doc;
            Account.push(data);
        });
        Account = Account.filter((user) =>  user.role == req.user.accountType);
        console.log(Account);
        res.render("partials/screens/so/index", {
            "current": currentPage,
            "account": Account[0],
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
    let { id, name, phone, newPassword} = req.body;
    console.log(name);
    try {
        const accountSnapshot = await client.db(dbName).collection("accounts").findOne({ _id: id });
        
        const updateData = {
            name: name ? name : accountSnapshot.name,
            phone: phone ? phone : accountSnapshot.phone,
            hashedpassword: newPassword ? await hashPassword(newPassword) : accountSnapshot.hashedpassword,
        };

        //update
        await client.db(dbName).collection("accounts").updateOne({ _id: id }, { $set: updateData });

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

module.exports = controller;