const controller = {}
const currentPage = 0;

let {Report, Ad, AdLocation} = require("../../../html/assets/data");
let {changeId} = require("../../../html/assets/data");


controller.delete = (req, res) => {
    let IDs = isNaN(req.params.id) ? 0 : req.params.id.split('.');

    IDs = IDs.map((IDs) => {
        return parseInt(IDs);
    });
    
    changeId('adlocation', IDs);
    res.send("Deleted");
}

controller.show = (req, res) => {
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "report": Report,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/ttqc";
        }
    });
}

module.exports = controller;