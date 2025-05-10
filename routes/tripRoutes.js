const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.getAllTrips);
router.get('/trips/:id', tripController.getTripDetails);
router.get('/:id', tripController.getTripDetails);

module.exports = router;
