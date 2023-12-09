const controller = {}
const currentPage = 5;

let {ChangeReq, AdLocation} = require("../../../html/assets/data");
let {changeId} = require("../../../html/assets/data");


controller.delete = (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    changeId('changereq', id);
    res.send("Deleted");
}

controller.show = (req, res) => {
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "changeReq": ChangeReq,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/dieuchinh";
        }
    });
}

module.exports = controller;