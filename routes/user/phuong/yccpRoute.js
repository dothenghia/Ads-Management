const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/phuong/yccpController");

router.get("/", controller.show);
router.delete("/:id", controller.deletePermissionReq)

module.exports = router;