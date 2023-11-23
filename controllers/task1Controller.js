const controller = {};
controller.show = (req,res) => {
    let {emotions} = require("../data");
    res.locals.emotions = emotions;
    res.render("task1");

    //res.render("task1", {emotions})
}


module.exports = controller;