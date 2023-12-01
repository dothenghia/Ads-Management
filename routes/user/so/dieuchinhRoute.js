const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/dieuchinhController");

router.get("/", controller.show);

module.exports = router;