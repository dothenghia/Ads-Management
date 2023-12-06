const controller = {}


let {changeId} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    changeId('changereq', id);
    res.send("Deleted");
}

module.exports = controller;