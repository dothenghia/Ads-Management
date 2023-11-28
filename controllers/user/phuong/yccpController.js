const controller = {}

const currentPage = 4;

controller.show = (req,res) => {
    res.render("partials/screens/phuong/index", {"current": currentPage,
        body: function() {
            return "screens/phuong/yeucaucapphep";
        }
    });
}

module.exports = controller;