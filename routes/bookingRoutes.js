<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware'); // Using authMiddleware

// Route to proceed to the payment/confirmation page
router.post('/payment', authMiddleware, bookingController.proceedToPayment); 
// Route to process the booking
router.post('/book', authMiddleware, bookingController.processBooking); 
// Route to view booking details
router.get('/:id', authMiddleware, bookingController.getBookingById); 
// Route to cancel a booking
router.delete('/:id', authMiddleware, bookingController.deleteBooking); 
module.exports = router;
=======
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware'); // Using authMiddleware

// Route to proceed to the payment/confirmation page
router.post('/payment', authMiddleware, bookingController.proceedToPayment); 
// Route to process the booking
router.post('/book', authMiddleware, bookingController.processBooking); 
// Route to view booking details
router.get('/:id', authMiddleware, bookingController.getBookingById); 
// Route to cancel a booking
router.delete('/:id', authMiddleware, bookingController.deleteBooking); 
module.exports = router;
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f
