const controller = {}
const currentPage = 2;

let {Account} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = (req, res) => {
    res.render("partials/screens/so/index", {
        "current": currentPage,
        "account": Account,
        body: function() {
            return "screens/so/nhansu";
        }
    });
}

module.exports = controller;