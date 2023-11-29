const controller = {}

const currentPage = 1;

controller.show = (req,res) => {
    res.render("partials/screens/phuong/index", {"current": currentPage,
        body: function() {
            return "screens/phuong/thongtinquangcao";
        }
    });
}

module.exports = controller;