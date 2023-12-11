const controller = {}
const currentPage = 2;

const admin = require("../../../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();


controller.delete = (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    changeId('account', id);
    res.send("Deleted");
}

controller.show = async (req, res) => {
    try {
        const accountRef = db.collection("accounts");
        const accountSnapshot = await accountRef.get();

        let Account = [];
        accountSnapshot.forEach((doc) => {
            Account.push(doc.data());
        });

        res.render("partials/screens/so/index", {
            "current": currentPage,
            "account": Account,
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
    let { id, name, phone, username, password, role, area } = req.body;
    
    
    try {
        const accountRef = await db.collection("accounts").where("id", "==", id).get();

        // Initialize an array to store promises for each update operation
        const updatePromises = [];

        // Iterate over the documents in the query result
        accountRef.forEach((doc) => {
            const updateData = {
                name: name,
                phone: phone,
                username: username,
                role: role
            };
            // Cần chỉnh lại pass word và area
            // Update each document and add the resulting promise to the array
            updatePromises.push(doc.ref.update(updateData));
        });

        // Wait for all update operations to complete
        await Promise.all(updatePromises);

        res.send("Documents updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

module.exports = controller;