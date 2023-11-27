const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/phuong/bdController");

router.get("/", controller.show);

module.exports = router;