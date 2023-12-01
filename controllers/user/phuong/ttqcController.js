const controller = {}

const currentPage = 1;

let {Ad, AdLocation} = require("../../../html/assets/data");

controller.show = (req, res) => {
    res.render("partials/screens/phuong/index", {
        "current": currentPage,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/phuong/thongtinquangcao";
        }
    });
}

module.exports = controller;