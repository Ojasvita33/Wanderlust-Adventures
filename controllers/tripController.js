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
        // Fetch weather for trip destination using city, country, or region
        const { getWeather } = require('../utils/weatherApi');
        let weather = null;
        let query = null;
        if (trip.city && trip.country) {
            query = `${trip.city},${trip.country}`;
        } else if (trip.city) {
            query = trip.city;
        } else if (trip.country) {
            query = trip.country;
        } else if (trip.details && trip.details.Region) {
            query = trip.details.Region;
        }
        if (query) {
            console.log('Weather Query:', query);
            weather = await getWeather(query);
            if (weather) {
                console.log('Weather Response:', weather);
            } else {
                console.log('No weather data returned for:', query);
            }
        } else {
            console.log('No valid location found for weather query.');
        }

        // Fetch currency exchange rates (INR as base)
        const { getExchangeRates } = require('../utils/exchangeApi');
        let exchangeRates = null;
        try {
            exchangeRates = await getExchangeRates('INR');
        } catch (err) {
            console.error('Exchange rate fetch error:', err);
        }

        // Fetch public holidays for trip country and year
        const { getPublicHolidays } = require('../utils/holidaysApi');
        let holidays = null;
        // Use region for holidays API if country is missing
        let countryCode = trip.country;
        if (!countryCode && trip.details && trip.details.Region) {
            countryCode = trip.details.Region;
        }
        if (!countryCode) countryCode = 'IN';
        // Use ISO country code if possible (e.g., 'IN' for India)
        // If country is full name or region, convert to code (simple mapping for demo)
        const countryMap = { 'India': 'IN', 'United States': 'US', 'Vietnam': 'VN', 'Japan': 'JP', 'United Kingdom': 'GB', 'Rajasthan': 'IN', 'Kerala': 'IN', 'Goa': 'IN' };
        if (countryMap[countryCode]) countryCode = countryMap[countryCode];
        let year = trip.date ? new Date(trip.date).getFullYear() : new Date().getFullYear();
        try {
            holidays = await getPublicHolidays(countryCode, year);
        } catch (err) {
            console.error('Public holidays fetch error:', err);
        }

        res.render('tripdetails', {
            title: trip.name,
            trip: trip,
            user: req.session.user,
            currentUrl: req.originalUrl,
            weather: weather,
            exchangeRates: exchangeRates,
            holidays: holidays
        });
    } catch (error) {
        res.status(500).send('Error fetching trip details');
    }
};