<<<<<<< HEAD
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
    city: { type: String, required: true }, // For weather API
    country: { type: String } // Optional, for more accuracy
});

module.exports = mongoose.model('Trip', tripSchema);
=======
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    itinerary: { type: [String] },
    details: { type: Object },
    image: { type: String }, 
    images: { type: [String] }
});

module.exports = mongoose.model('Trip', tripSchema);
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f
