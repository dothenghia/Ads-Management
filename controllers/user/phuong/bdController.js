const controller = {}
const currentPage = 0;

const jwt = require("jsonwebtoken");
let {AdLocation} = require("../../../html/assets/adLoc_test");

controller.show = async (req,res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentAccount = { accountType: decoded.accountType, areaId: decoded.areaId, areaName: decoded.areaName, name: decoded.name };

    // Get current page's data
    res.render("partials/screens/phuong/index", {"current": currentPage, "account": currentAccount, "AdLocation": AdLocation,
        body: function() {
            return "screens/phuong/bando";
        }
    });
}

module.exports = controller;