const controller = {}

controller.show = (req,res) =>{
    res.render("canbo", {"role": 0});
}

module.exports = controller;