const controller = {}
const currentPage = 6;

const admin = require("../../../config/firebaseAdmin");
const db = admin.firestore();

controller.show = async (req, res) => {
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, jwtSecret);
    
    console.log(req.user);
    try {
        const accountRef = db.collection("accounts");
        const accountSnapshot = await accountRef.get();

        let Account = [];
        accountSnapshot.forEach((doc) => {
            Account.push(doc.data());
        });

        // console.log(Account);
        res.render("partials/screens/so/index", {
            "current": currentPage,
            "account": Account,
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
    let { id, name, phone } = req.body;

    try {
        const accountRef = await db.collection("accounts").where("id", "==", id).get();

        // Initialize an array to store promises for each update operation
        const updatePromises = [];

        // Iterate over the documents in the query result
        accountRef.forEach((doc) => {
            const updateData = {
                name: name,
                phone: phone
            };
            // Cần chỉnh lại pass word và area
            // Update each document and add the resulting promise to the array
            updatePromises.push(doc.ref.update(updateData));
        });

        // Wait for all update operations to complete
        await Promise.all(updatePromises);
    } catch {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}




module.exports = controller;