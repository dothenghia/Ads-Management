const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/quan/ycdcController");
const multer = require('multer');
const upload = multer();

router.get("/", controller.show);
router.post("/taomoi", upload.array("newChangeReqThumbnailsUpdate"), controller.createChangeReq);

module.exports = router;