const express = require("express");
const router = express.Router();

const controller = require("../../controllers/general/changePasswordDoneController");
//hiện tại đang general, phải ../ 2 lần để về root là thư mục chứa index, sau đó đên controllers, 
router.get("/",controller.show);

module.exports = router;