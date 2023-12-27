const controller = {}
const currentPage = 4;

const jwt = require("jsonwebtoken");
let {Report, Ad, AdLocation} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = async (req, res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentRoleInfo = { accountType: decoded.accountType, areaId: decoded.areaId, areaName: decoded.areaName, name: decoded.name };

    res.render("partials/screens/so/index", {
        "current": currentPage,
        "roleInfo": currentRoleInfo,
        "report": Report,
        "ad": Ad,
        "adLocation": AdLocation,
        body: function() {
            return "screens/so/thongke";
        }
    });
}

module.exports = controller;