const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController'); // Adjust path if needed

router.get('/', contactController.getContactPage);
router.post('/', contactController.handleContactFormSubmission); // Uncomment this line

module.exports = router;