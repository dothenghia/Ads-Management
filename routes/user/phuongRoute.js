const express = require("express");
const router = express.Router();

router.use("/bando", require("./phuong/bdRoute"));
router.use("/thongtinquangcao", require("./phuong/ttqcRoute"));
router.use("/yeucaudieuchinhqc", require("./phuong/ycdcRoute"));
router.use("/yeucaudieuchinhdd", require("./phuong/ycdcddRoute"));
router.use("/baocao", require("./phuong/bcRoute"));
router.use("/yeucaucapphep", require("./phuong/yccpRoute"));
router.use("/thongtincanhan", require("./chung/thongtincanhanRoute"));

module.exports = router;