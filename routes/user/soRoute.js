const express = require("express");
const router = express.Router();

router.use('/so', (req, res) => {
    res.redirect('/thongtinquangcao');
});
router.use("/baocao", require("./so/baocaoRoute"));
router.use("/thongtinquangcao", require("./so/ttbqcRoute"));
router.use("/thongtindiadiemquangcao", require("./so/ttdqcRoute"));
router.use("/nhansu", require("./so/nhansuRoute"));
router.use("/dieuchinh", require("./so/dieuchinhRoute"));
router.use("/yeucaudieuchinh", require("./so/dieuchinhRoute"));
router.use("/capphep", require("./so/capphepRoute"));
router.use("/thongke", require("./so/thongkeRoute"));
router.use("/thongtincanhan", require("./chung/thongtincanhanRoute"));

// router.use("/yeucaudieuchinh", require("./phuong/ycdcRoute"));
// router.use("/baocao", require("./phuong/bcRoute"));
// router.use("/yeucaucapphep", require("./phuong/yccpRoute"));

module.exports = router;