const controller = {}
const currentPage = 0;

let {AdLocation} = require("../../../html/assets/adLoc_test");

controller.show = (req,res) => {
    res.render("partials/screens/phuong/index", {"current": currentPage, "AdLocation": AdLocation,
        body: function() {
            return "screens/phuong/bando";
        }
    });
}

module.exports = controller;