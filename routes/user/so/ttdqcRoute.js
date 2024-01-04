const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/ttdqcController");
const multer = require('multer');
const upload = multer();

router.get("/", controller.show);
router.put("/", upload.array("EditAdLocationThumbnails"), controller.edit);
router.post("/", upload.array("newAdLocationThumbnails"),controller.add);
router.post("/:id", controller.addNewAd);
router.delete("/:id", controller.delete);

module.exports = router;