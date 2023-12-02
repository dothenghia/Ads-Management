const controller = {}
const currentPage = 2;

let {ChangeReq} = require("../../../html/assets/request");
let {AdLocation} = require("../../../html/assets/data");

controller.show = (req, res) => {
    res.render("partials/screens/quan/index", {
        "current": currentPage,
        "changeReq": ChangeReq,
        "adLocation": AdLocation,
        body: function() {
            return "screens/quan/yeucaudieuchinh";
        }
    });
}

module.exports = controller;