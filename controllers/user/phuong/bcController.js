const controller = {}

const currentPage = 3;

controller.show = (req,res) => {
    res.render("partials/screens/phuong/index", {"current": currentPage,
        body: function() {
            return "screens/phuong/baocao";
        }
    });
}

module.exports = controller;