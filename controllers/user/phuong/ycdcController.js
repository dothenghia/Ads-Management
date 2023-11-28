const controller = {}

const currentPage = 2;

controller.show = (req,res) => {
    res.render("partials/screens/phuong/index", {"current": currentPage,
        body: function() {
            return "screens/phuong/yeucaudieuchinh";
        }
    });
}

module.exports = controller;