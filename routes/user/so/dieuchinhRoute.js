const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/so/dieuchinhController");
const controllerDelete = require("../../../controllers/user/so/dieuchinhDeleteController");

router.get("/", controller.show);
router.delete("/:id", controllerDelete.show);

module.exports = router;