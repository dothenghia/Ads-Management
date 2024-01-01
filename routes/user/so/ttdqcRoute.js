const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/ttdqcController");

router.get("/", controller.show);
router.put("/", controller.edit);
router.post("/", controller.add);
router.post("/:id", controller.addNewAd);
router.delete("/:id", controller.delete);

module.exports = router;