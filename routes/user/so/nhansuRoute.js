const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/nhansuController");

router.get("/", controller.show);

module.exports = router;