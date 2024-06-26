const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/quan/bcController");

router.get("/", controller.show);
router.put("/chapnhan/:id", controller.acceptChange);
router.put("/tuchoi/:id", controller.denyChange);

module.exports = router;