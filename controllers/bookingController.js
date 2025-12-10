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
    
    if (!req.session.user || !req.session.user._id) {
        return res.status(401).send('Please log in to make a booking.');
    }
    
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

        // Send booking confirmation email
        try {
            const { sendMail } = require('../utils/mailApi');
            const userEmail = req.session.user.email;
            const userName = req.session.user.name || 'Traveler';
            const travelDate = new Date(selectedDate).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });
            
            const subject = `Booking Confirmed: ${trip.name}`;
            const text = `Dear ${userName},\n\nYour booking for '${trip.name}' scheduled for ${travelDate} has been confirmed!\n\nGet ready for an amazing adventure!\n\nBest regards,\nWanderlust Adventures Team`;
            
            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, hsl(190, 77%, 33%), hsl(190, 77%, 25%)); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h2 style="margin: 0;">✓ Booking Confirmed!</h2>
                    </div>
                    <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
                        <p>Dear <strong>${userName}</strong>,</p>
                        <p>Great news! Your booking has been successfully confirmed.</p>
                        
                        <div style="background-color: white; padding: 15px; border-left: 4px solid hsl(190, 77%, 33%); margin: 20px 0;">
                            <p style="margin: 0;"><strong>Trip:</strong> ${trip.name}</p>
                            <p style="margin: 5px 0;"><strong>Travel Date:</strong> ${travelDate}</p>
                            <p style="margin: 5px 0;"><strong>Price:</strong> ₹${trip.price}</p>
                        </div>
                        
                        <p>Get ready for an amazing adventure! We will send you more details closer to your travel date.</p>
                        <p>If you have any questions, feel free to contact our support team.</p>
                        
                        <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 20px; color: #666; font-size: 0.9em;">
                            <p>Best regards,<br><strong>Wanderlust Adventures Team</strong></p>
                        </div>
                    </div>
                </div>
            `;
            
            await sendMail(userEmail, subject, text, html);
        } catch (err) {
            console.error('Error sending booking confirmation email:', err);
        }

        res.redirect(`/users/profile`); // Redirect to profile after booking
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
    
    if (!req.session.user || !req.session.user._id) {
        return res.status(401).send('Please log in to delete a booking.');
    }
    
    try {
        const bookingToDelete = await Booking.findById(bookingId).populate('trip');
        if (!bookingToDelete) {
            return res.status(404).send('Booking not found.');
        }

        if (bookingToDelete.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('Unauthorized to delete this booking.');
        }

        // Get trip details before deleting
        const tripName = bookingToDelete.trip ? bookingToDelete.trip.name : 'Your Trip';
        const travelDate = new Date(bookingToDelete.tripStartDate).toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });

        // Send cancellation email
        try {
            const { sendMail } = require('../utils/mailApi');
            const userEmail = req.session.user.email;
            const userName = req.session.user.name || 'Traveler';
            
            const subject = `Booking Cancelled: ${tripName}`;
            const text = `Dear ${userName},\n\nYour booking for '${tripName}' scheduled for ${travelDate} has been successfully cancelled.\n\nWe hope to see you on another adventure soon!\n\nBest regards,\nWanderlust Adventures Team`;
            
            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, hsl(190, 77%, 33%), hsl(190, 77%, 25%)); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h2 style="margin: 0;">Booking Cancelled</h2>
                    </div>
                    <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
                        <p>Dear <strong>${userName}</strong>,</p>
                        <p>Your booking has been successfully cancelled.</p>
                        
                        <div style="background-color: white; padding: 15px; border-left: 4px solid hsl(190, 77%, 33%); margin: 20px 0;">
                            <p style="margin: 0;"><strong>Trip:</strong> ${tripName}</p>
                            <p style="margin: 5px 0;"><strong>Travel Date:</strong> ${travelDate}</p>
                        </div>
                        
                        <p>If you have any refund-related questions, please contact our support team.</p>
                        <p>We hope to see you on another adventure soon!</p>
                        
                        <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 20px; color: #666; font-size: 0.9em;">
                            <p>Best regards,<br><strong>Wanderlust Adventures Team</strong></p>
                        </div>
                    </div>
                </div>
            `;
            
            await sendMail(userEmail, subject, text, html);
        } catch (err) {
            console.error('Error sending cancellation email:', err);
            // Continue with deletion even if email fails
        }

        await Booking.findByIdAndDelete(bookingId);
        res.redirect('/users/profile');
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send('Error deleting booking.');
    }
};