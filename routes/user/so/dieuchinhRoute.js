const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/dieuchinhController");
;

router.get("/", controller.show);
router.put("/chapnhan/:id", controller.acceptChange);
router.put("/tuchoi/:id", controller.denyChange);
router.delete("/:id", controller.delete);

module.exports = router;