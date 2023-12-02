const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/thongkeController");

router.get("/", controller.show);

module.exports = router;