const express = require("express");
const router = express.Router();

router.use("/bando", require("./quan/bdRoute"));
router.use("/thongtinquangcao", require("./quan/ttqcRoute"));
router.use("/yeucaudieuchinhqc", require("./quan/ycdcRoute"));
router.use("/yeucaudieuchinhdd", require("./quan/ycdcddRoute"));
router.use("/baocao", require("./quan/bcRoute"));
router.use("/yeucaucapphep", require("./quan/yccpRoute"));
router.use("/thongtincanhan", require("./chung/thongtincanhanRoute"));

module.exports = router;