const controller = {}
const currentPage = 1;

let {Report, Ad, AdLocation} = require("../../../html/assets/data");
let {changeId} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = (req, res) => {
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "report": Report,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/baocao";
        }
    });
}

controller.delete = (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    changeId('report', id);
    res.send("Deleted");
}


module.exports = controller;