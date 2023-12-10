const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/nhansuController");

router.get("/", controller.show);
router.put("/", controller.edit);
router.delete("/:id", controller.delete);

module.exports = router;