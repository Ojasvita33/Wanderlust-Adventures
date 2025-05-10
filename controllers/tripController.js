const Trip = require('../models/Trip');

// Fetch all trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.render('trips', { title: 'All Our Adventures', trips, user: req.session.user }); // Render a 'trips.ejs' view
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching trips');
    }
};

// Fetch trip by ID
exports.getTripDetails = async (req, res) => {
    const tripId = req.params.id;
    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).render('404', { title: 'Trip Not Found' });
        }
        res.render('tripDetails', {
            title: trip.name,
            trip: trip,
            user: req.session.user,
            currentUrl: req.originalUrl
        });
    } catch (error) {
        res.status(500).send('Error fetching trip details');
    }
};
