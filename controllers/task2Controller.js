const controller = {};

controller.show = (req,res) => {
    let salary = req.query.salary ? parseFloat(req.query.salary) : 0;
    let jar55 = (salary * 0.55).toFixed(2);
    let jar10 = (salary * 10) / 100;
    let jar5 = (salary * 5) / 100;
    res.render("task2", {jar55, jar10,jar5});
}

module.exports = controller;