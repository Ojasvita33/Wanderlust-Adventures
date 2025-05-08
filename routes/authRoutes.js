// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

router.get('/signup', authController.getSignup);
router.post('/signup', [
    body('name').trim().notEmpty().escape(),
    body('username').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], authController.postSignup);

router.get('/login', authController.getLogin);
router.post('/login', [
    body('username').trim().notEmpty().escape(),
    body('password').notEmpty()
], authController.postLogin);

router.get('/logout', authController.getLogout);

// New route to set the redirect URL in the session
router.get('/set-redirect', authController.setRedirect);

module.exports = router;