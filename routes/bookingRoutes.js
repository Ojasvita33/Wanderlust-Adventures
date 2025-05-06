const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { requireLogin } = require('../middleware/authMiddleware');

// Route to proceed to the payment/confirmation page
router.post('/payment', requireLogin, bookingController.proceedToPayment);

// Route to process the booking
router.post('/book', requireLogin, bookingController.processBooking);

// Route to view booking details
router.get('/:id', requireLogin, bookingController.getBookingById);

// Route to cancel a booking
router.delete('/:id', requireLogin, bookingController.deleteBooking);

module.exports = router;