const controller = {}


let {changeId} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = (req, res) => {
    let IDs = isNaN(req.params.id) ? 0 : req.params.id.split('.');

    IDs = IDs.map((IDs) => {
        return parseInt(IDs);
    });
    
    changeId('adlocation', IDs);
    res.send("Deleted");
}

module.exports = controller;