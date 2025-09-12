<<<<<<< HEAD
// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

router.get('/set-redirect', authController.setRedirect);

module.exports = router;
=======
// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

router.get('/set-redirect', authController.setRedirect);

module.exports = router;
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f
