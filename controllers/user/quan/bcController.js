const controller = {}
const currentPage = 3;

let {Report, Ad, AdLocation} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = (req, res) => {
    res.render("partials/screens/quan/index", {
        "current": currentPage,
        "report": Report,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/quan/baocao";
        }
    });
}

module.exports = controller;