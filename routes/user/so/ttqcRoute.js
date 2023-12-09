const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/ttqcController");

router.get("/", controller.show);
router.delete("/:id", controller.delete);

module.exports = router;