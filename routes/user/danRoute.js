const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/dan/danController")

router.get('/test', (req, res) => {
    res.json({
        message: "Hello 🐭"
    })
});

router.get("/ddqcgeojson", controller.getAdLocationGeoJSONList);
router.get("/ddbcbkgeojson", controller.getReportGeoJSONList);

router.get("/ddqc/:locaId", controller.getAdLocationInfoById);

router.get("/qc", controller.getAdInfoById); // PHẢI LẤY QUERY PARAMS
router.get("/bc/:rpId", controller.getReportInfoById);

router.get("/bclength", controller.getReportLength);
router.get("/dsbc", controller.getReportList);


module.exports = router;