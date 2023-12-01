const express = require("express");
const router = express.Router();

router.use("/baocao", require("./so/baocaoRoute"));
router.use("/thongtinquangcao", require("./so/ttqcRoute"));
router.use("/nhansu", require("./so/nhansuRoute"));
router.use("/dieuchinh", require("./so/dieuchinhRoute"));
// router.use("/yeucaudieuchinh", require("./phuong/ycdcRoute"));
// router.use("/baocao", require("./phuong/bcRoute"));
// router.use("/yeucaucapphep", require("./phuong/yccpRoute"));

module.exports = router;