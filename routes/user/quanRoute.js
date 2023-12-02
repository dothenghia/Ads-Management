const express = require("express");
const router = express.Router();

router.use("/bando", require("./quan/bdRoute"));
router.use("/thongtinquangcao", require("./quan/ttqcRoute"));
router.use("/thongtinquangcao", require("./quan/ttqcRoute"));
router.use("/yeucaudieuchinh", require("./quan/ycdcRoute"));
router.use("/baocao", require("./quan/bcRoute"));
router.use("/yeucaucapphep", require("./quan/yccpRoute"));

module.exports = router;