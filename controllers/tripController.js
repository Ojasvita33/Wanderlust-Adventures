const Trip = require('../models/Trip');
const { getWeather } = require('../utils/weatherApi');
const { getExchangeRates } = require('../utils/exchangeApi');

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

        // Fetch optional contextual data in parallel; failures fall back to null
        let weather = null;
        let exchangeRates = null;

        try {
            // Preferred order: explicit weatherLocation, city, itinerary hint, region
            let location = trip.weatherLocation || trip.city;

            if (!location && trip.itinerary && trip.itinerary.length > 0) {
                const firstDay = trip.itinerary[0];
                const cityMatch = firstDay.match(/(?:in|to)\s+([A-Z][a-zA-Z\s]+?)(?:\s+&|\s+-|$)/);
                if (cityMatch) {
                    location = cityMatch[1].trim();
                }
            }

            if (!location && trip.details && trip.details.Region) {
                location = trip.details.Region;
            }

            if (location) {
                console.log('Fetching weather for location:', location);
                weather = await getWeather(location);
                console.log('Weather data received:', weather ? 'Success' : 'Null');
            } else {
                console.log('No valid location found for trip:', trip.name);
            }
        } catch (err) {
            console.error('Weather fetch failed:', err.message || err);
        }

        try {
            console.log('Fetching exchange rates for INR');
            exchangeRates = await getExchangeRates('INR');
            console.log('Exchange rates received:', exchangeRates ? 'Success' : 'Null');
        } catch (err) {
            console.error('Exchange rate fetch failed:', err.message || err);
        }

        res.render('tripdetails', {
            title: trip.name,
            trip,
            user: req.session.user,
            currentUrl: req.originalUrl,
            weather,
            exchangeRates
        });
    } catch (error) {
        console.error('Error fetching trip details:', error);
        res.status(500).send('Error fetching trip details');
    }
};
