const controller = {}
const currentPage = 4;

let {PermissionReq} = require("../../../html/assets/request");
let {AdLocation} = require("../../../html/assets/data");

controller.show = (req, res) => {
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "permissionReq": PermissionReq,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/capphep";
        }
    });
}

module.exports = controller;