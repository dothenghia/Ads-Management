const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/chung/thongtincanhanController");

router.get("/", controller.show);
// router.delete("/:id", controller.delete);

module.exports = router;