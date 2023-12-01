const express = require('express');
const router = express.Router();
const passport = require('../../config/passportConfig');

const controller = require('../../controllers/general/loginController');

router.get('/', controller.show);

router.post('/', controller.submit);

module.exports = router;
