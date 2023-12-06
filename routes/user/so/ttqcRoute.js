const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/ttqcController");
const controllerDelete = require("../../../controllers/user/so/ttqcDeleteController");

router.get("/", controller.show);
router.delete("/:id", controllerDelete.show);

module.exports = router;