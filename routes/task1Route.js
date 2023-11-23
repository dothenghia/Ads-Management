const express = require("express");
const router = express.Router();

const controller = require("../controllers/task1Controller")

router.get("/", controller.show)

module.exports = router;
