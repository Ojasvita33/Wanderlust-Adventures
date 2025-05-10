const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    tripStartDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
