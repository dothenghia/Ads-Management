const controller = {}

const currentPage = 0;

controller.show = (req,res) => {
    res.render("partials/screens/phuong/index", {"current": currentPage,
        body: function() {
            return "screens/phuong/bando";
        }
    });
}

module.exports = controller;