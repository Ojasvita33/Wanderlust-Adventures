const Booking = require('../models/Bookings');
const Trip = require('../models/Trip');

exports.proceedToPayment = async (req, res) => {
    const { tripId, selectedDate } = req.body;

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).send('Trip not found.');
        }

        res.render('payment', { title: 'Confirm Payment & Book', trip: trip, selectedDate: selectedDate });
    } catch (error) {
        console.error('Error fetching trip for payment confirmation:', error);
        res.status(500).send('Error loading payment confirmation page.');
    }
};

exports.processBooking = async (req, res) => {
    const { tripId, selectedDate } = req.body;
    const userId = req.session.user._id;

    if (!selectedDate) {
        return res.status(400).send('Please select a date.');
    }

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).send('Trip not found.');
        }

        const newBooking = new Booking({
            user: userId,
            trip: tripId,
            tripStartDate: new Date(selectedDate)
        });

        await newBooking.save();
        res.redirect(`/users/profile`); 
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Error creating booking.');
    }
};

exports.getBookingById = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const booking = await Booking.findById(bookingId).populate('user trip');
        if (!booking) {
            return res.status(404).render('404', { title: 'Booking Not Found' });
        }
        res.render('bookingdetails', { title: 'Booking Details', booking: booking });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).send('Error fetching booking details.');
    }
};

exports.deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const bookingToDelete = await Booking.findById(bookingId);
        if (!bookingToDelete) {
            return res.status(404).send('Booking not found.');
        }

        if (bookingToDelete.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('Unauthorized to delete this booking.');
        }

        await Booking.findByIdAndDelete(bookingId);
        res.redirect('/users/profile');
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send('Error deleting booking.');
    }
};