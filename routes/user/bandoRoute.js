const express = require("express");
const router = express.Router();
const phuongController = require("../../controllers/user/bando/phuongController")

router.get('/test', (req, res) => {
    res.json({
        message: "Hello 🐭"
    })
});

// Lấy danh sách ĐỊA ĐIỂM QUẢNG CÁO tại Phường đó (Dạng GeoJSON)
router.get("/phuong/ddqc", phuongController.ddqc);

// Lấy danh sách ĐỊA ĐIỂM BÁO CÁO BẤT KỲ tại Phường đó (Dạng GeoJSON)
router.get("/phuong/ddbcbk", phuongController.ddbcbk);





module.exports = router;