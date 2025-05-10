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
