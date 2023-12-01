const express = require('express');
const router = express.Router();
const controller = require('../../controllers/general/logoutController')
// Logout route
router.get('/', controller.logout);

module.exports = router;
