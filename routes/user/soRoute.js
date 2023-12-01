const express = require("express");
const router = express.Router();

router.use("/baocao", require("./so/baocaoRoute"));
// router.use("/thongtinquangcao", require("./phuong/ttqcRoute"));
// router.use("/yeucaudieuchinh", require("./phuong/ycdcRoute"));
// router.use("/baocao", require("./phuong/bcRoute"));
// router.use("/yeucaucapphep", require("./phuong/yccpRoute"));

module.exports = router;