const controller = {}
const currentPage = 0;

let {AdLocation} = require("../../../html/assets/adLoc_test");

controller.show = (req,res) => {
    res.render("partials/screens/quan/index", {"current": currentPage, "AdLocation": AdLocation,
        body: function() {
            return "screens/quan/bando";
        }
    });
}

module.exports = controller;