const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/phuong/ycdcddController");

router.get("/", controller.show);
router.post("/taomoi", controller.createChangeReq);

module.exports = router;