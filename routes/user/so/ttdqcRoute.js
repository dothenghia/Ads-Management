const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/ttdqcController");

router.get("/", controller.show);
router.post("/", controller.add);
router.delete("/:id", controller.delete);

module.exports = router;