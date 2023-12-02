const controller = {}
const currentPage = 4;

let {PermissionReq} = require("../../../html/assets/request");
let {Ad, AdLocation} = require("../../../html/assets/data");

controller.show = (req, res) => {
    res.render("partials/screens/phuong/index", {
        "current": currentPage,
        "permissionReq": PermissionReq,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/phuong/yeucaucapphep";
        }
    });
}

module.exports = controller;