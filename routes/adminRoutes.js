const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', authMiddleware, requireAdmin, adminController.getDashboard);

// Trip management routes
router.get('/trips', authMiddleware, requireAdmin, adminController.getTripsManagement);
router.get('/trips/add', authMiddleware, requireAdmin, adminController.getAddTrip);
router.post('/trips/add', authMiddleware, requireAdmin, upload.single('primaryImage'), adminController.postAddTrip);
router.get('/trips/edit/:id', authMiddleware, requireAdmin, adminController.getEditTrip);
router.post('/trips/edit/:id', authMiddleware, requireAdmin, upload.single('primaryImage'), adminController.postEditTrip);
router.delete('/trips/:id', authMiddleware, requireAdmin, adminController.deleteTrip);

// User management routes
router.get('/users', authMiddleware, requireAdmin, adminController.getUsersManagement);
router.patch('/users/:id/role', authMiddleware, requireAdmin, adminController.toggleUserRole);

module.exports = router;
