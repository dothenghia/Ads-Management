const express = require("express");
const router = express.Router();
const phuongController = require("../../controllers/user/bando/phuongController")
const quanController = require("../../controllers/user/bando/quanController")

router.get('/test', (req, res) => {
    res.json({
        message: "Hello 🐭"
    })
});

// Lấy danh sách ĐỊA ĐIỂM QUẢNG CÁO tại Phường đó (Dạng GeoJSON)
router.get("/phuong/ddqc", phuongController.ddqc);
// Lấy danh sách ĐỊA ĐIỂM QUẢNG CÁO tại Quận đó (Dạng GeoJSON)
router.get("/quan/ddqc", quanController.ddqc);

// Lấy danh sách ĐỊA ĐIỂM BÁO CÁO BẤT KỲ tại MỌI NƠI (Dạng GeoJSON)
router.get("/ddbcbk", phuongController.ddbcbk);

// Lấy thông tin ĐỊA ĐIỂM QUẢNG CÁO theo locationId
router.get("/ddqc/:locaId", phuongController.getAdLocationInfoById);

// Lấy thông tin BẢNG QUẢNG CÁO
router.get("/qc", phuongController.getAdInfoById); // PHẢI LẤY QUERY PARAMS


module.exports = router;