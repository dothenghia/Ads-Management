const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/baocaoController");
const controllerDelete = require("../../../controllers/user/so/baocaoDeleteController");

router.get("/", controller.show);
router.delete("/:id", controllerDelete.show);

module.exports = router;