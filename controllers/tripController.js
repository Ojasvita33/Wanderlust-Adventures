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
    console.log('Fetching trip details for ID:', tripId);
    try {
        const trip = await Trip.findById(tripId);
        console.log('Trip found:', trip);
        if (!trip) {
            console.log('Trip not found for ID:', tripId);
            return res.status(404).render('404', { title: 'Trip Not Found' });
        }
        res.render('tripDetails', {
            title: trip.name,
            trip: trip,
            user: req.session.user,
            currentUrl: req.originalUrl
        });
        console.log('Trip details rendered successfully');
    } catch (error) {
        console.error('Error fetching trip details:', error);
        res.status(500).send('Error fetching trip details');
    }
};