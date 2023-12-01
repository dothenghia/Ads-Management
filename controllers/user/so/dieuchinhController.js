const controller = {}
const currentPage = 2;

let {ChangeReq, AdLocation} = require("../../../html/assets/data");

// console.log(AdLocation);
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