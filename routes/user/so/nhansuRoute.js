const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/nhansuController");
const controllerDelete = require("../../../controllers/user/so/nhansuDeleteController");

router.get("/", controller.show);
router.delete("/:id", controllerDelete.show);

module.exports = router;