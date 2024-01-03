const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/dan/danController")

router.get('/test', (req, res) => {
    res.json({
        message: "Hello 🐭"
    })
});

router.post("/ddqcgeojson", controller.getAdLocationGeoJSONList);
router.get("/ddbcbkgeojson", controller.getReportGeoJSONList);

router.post("/ddqc/:locaId", controller.getAdLocationInfoById);

router.post("/qc", controller.getAdInfoById); // PHẢI LẤY QUERY PARAMS
router.get("/bc/:rpId", controller.getReportInfoById);

router.get("/dsbc", controller.getReportList);

router.post("/upload", controller.uploadData);

module.exports = router;