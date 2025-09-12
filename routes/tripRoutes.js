<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.getAllTrips);
router.get('/trips/:id', tripController.getTripDetails);
router.get('/:id', tripController.getTripDetails);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.getAllTrips);
router.get('/trips/:id', tripController.getTripDetails);
router.get('/:id', tripController.getTripDetails);

module.exports = router;
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f
