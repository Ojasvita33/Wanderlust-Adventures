<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f
