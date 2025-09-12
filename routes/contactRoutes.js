<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContactPage);
router.post('/', contactController.handleContactFormSubmission);


module.exports = router;
=======
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContactPage);
router.post('/', contactController.handleContactFormSubmission);

module.exports = router;
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f
