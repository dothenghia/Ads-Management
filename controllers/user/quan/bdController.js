const controller = {}
const currentPage = 0;

const jwt = require("jsonwebtoken");

let {AdLocation} = require("../../../html/assets/adLoc_test");

controller.show = async (req,res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentAccount = { accountType: decoded.accountType, idQuan: decoded.idQuan, areaName: decoded.areaName, name: decoded.name, avatar: decoded.avatar };

    res.render("partials/screens/quan/index", {
        "current": currentPage,
        "account": currentAccount,
        "AdLocation": AdLocation,
        body: function() {
            return "screens/quan/bando";
        }
    });
}

module.exports = controller;