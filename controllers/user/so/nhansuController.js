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

module.exports = controller;