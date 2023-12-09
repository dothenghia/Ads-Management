const controller = {}
const currentPage = 2;

let {Account} = require("../../../html/assets/data");
let {changeId} = require("../../../html/assets/data");


controller.delete = (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    changeId('account', id);
    res.send("Deleted");
}

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