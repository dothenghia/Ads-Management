const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/quan/ycdcController");

router.get("/", controller.show);

module.exports = router;