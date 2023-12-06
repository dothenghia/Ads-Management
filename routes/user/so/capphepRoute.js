const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/capphepController");
const controllerDelete = require("../../../controllers/user/so/capphepDeleteController");

router.get("/", controller.show);
router.delete("/:id", controllerDelete.show);

module.exports = router;