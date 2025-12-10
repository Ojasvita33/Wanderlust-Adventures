const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    itinerary: { type: [String] },
    details: { type: Object },
    image: { type: String }, 
    images: { type: [String] },
    city: { type: String }, // Optional; prefer weatherLocation for API
    country: { type: String }, // Optional, for more accuracy
    weatherLocation: { type: String }, // Preferred city/location for weather API
    mapLocation: { type: String } // Preferred location string for map embed
});

module.exports = mongoose.model('Trip', tripSchema);