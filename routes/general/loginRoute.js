const express = require('express');
const router = express.Router();
const passport = require('../../config/passportConfig');
const controller = require('../../controllers/general/loginController');

router.get('/', controller.show);

router.post('/', controller.submit);

router.get('/auth/google', controller.initiateGoogleSignIn);
router.get('/auth/google/callback', controller.googleSignInCallback);

module.exports = router;
