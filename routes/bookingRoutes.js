const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware'); // Using authMiddleware

// Route to proceed to the payment/confirmation page
router.post('/payment', authMiddleware, bookingController.proceedToPayment); // Changed to authMiddleware

// Route to process the booking
router.post('/book', authMiddleware, bookingController.processBooking); // Changed to authMiddleware

// Route to view booking details
router.get('/:id', authMiddleware, bookingController.getBookingById); // Changed to authMiddleware

// Route to cancel a booking
router.delete('/:id', authMiddleware, bookingController.deleteBooking); // Changed to authMiddleware

module.exports = router;