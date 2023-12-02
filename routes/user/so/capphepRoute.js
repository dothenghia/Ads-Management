const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/capphepController");

router.get("/", controller.show);

module.exports = router;