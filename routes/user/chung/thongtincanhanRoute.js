const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/user/chung/thongtincanhanController");
const multer = require('multer');
const upload = multer();

router.get("/", controller.show);
router.put("/", controller.edit);
router.post("/", upload.single("avatar"), controller.editAvatar);
// router.delete("/:id", controller.delete);

module.exports = router;