const controller = {}
const currentPage = 0;

let {Report, Ad, AdLocation} = require("../../../html/assets/data");

// console.log(AdLocation);
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