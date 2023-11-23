const controller = {};
let {zodiacs} = require("../data");

controller.show = (req,res) => {
    res.render("task4",{
       zodiacs
    });
}
controller.showDetails = (req,res) => {
    let zodiac = zodiacs.filter((item) => item.name == req.params.name)[0];
    res.render("task4-details",{
        zodiac
    })
}
module.exports = controller;