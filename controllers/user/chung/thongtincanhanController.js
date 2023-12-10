const controller = {}
const currentPage = 6;

const admin = require("../../../config/firebaseAdmin");
const db = admin.firestore();

controller.show = async (req, res) => {
    res.render("partials/screens/so/index", {
        "current": currentPage,

        body: function() {
            return "screens/chung/my-profile";
        }
    });
}


// controller.delete = async (req, res) => {
//     let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    

//     const reportRef = await db.collection("reports").where("reportId", "==", id).get();
//     const updatePromise = []
//     reportRef.forEach((doc) => {
//         const updateId = {
//             reportId: -1
//         }
    
//         updatePromise.push(doc.ref.update(updateId));
//     });

//     await Promise.all(updatePromise);
//     res.send("Deleted");
// }


module.exports = controller;