const controller = {}

const currentPage = 1;

let {Report, Ad, AdLocation} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = (req, res) => {
    res.render("partials/screens/phuong/index", {
        "current": currentPage,
        "report": Report,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/phuong/thongtinquangcao";
        }
    });
}

module.exports = controller;