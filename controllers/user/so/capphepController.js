const controller = {}
const currentPage = 4;

let {AdLocation, Ad, PermissionReq} = require("../../../html/assets/data");
let {changeId} = require("../../../html/assets/data");

controller.show = (req, res) => {
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "permissionReq": PermissionReq,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/capphep";
        }
    });
}

controller.delete = (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    
    changeId('permissionreq', id);
    res.send("Deleted");
}

module.exports = controller;