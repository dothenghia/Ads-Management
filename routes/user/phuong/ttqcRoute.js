const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/phuong/ttqcController");
const multer = require('multer');
const upload = multer();

router.get("/", controller.show);
router.post("/taomoi", upload.array("newPermissionReqThumbnailsUpdate"), controller.createPermissionReq);

module.exports = router;