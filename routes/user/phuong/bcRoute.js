const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/phuong/bcController");

router.get("/", controller.show);

module.exports = router;