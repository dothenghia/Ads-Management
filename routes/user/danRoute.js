const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/dan/danController")

router.get('/test', (req, res) => {
    res.json({
        message: "Hello 🐭"
    })
});

// Lấy danh sách ĐỊA ĐIỂM QUẢNG CÁO (Dạng GeoJSON)
router.post("/ddqcgeojson", controller.getAdLocationGeoJSONList);

// Lấy danh sách ĐỊA ĐIỂM BÁO CÁO BẤT KỲ (Dạng GeoJSON)
router.get("/ddbcbkgeojson", controller.getReportGeoJSONList);

// Lấy thông tin ĐỊA ĐIỂM QUẢNG CÁO theo locationId
router.post("/ddqc/:locaId", controller.getAdLocationInfoById);

// Lấy thông tin BẢNG QUẢNG CÁO
router.post("/qc", controller.getAdInfoById); // PHẢI LẤY QUERY PARAMS
// Lấy thông tin BÁO CÁO
router.get("/bc/:rpId", controller.getReportInfoById);

router.get("/dsbc", controller.getReportList);

router.post("/upload", controller.uploadData);

module.exports = router;