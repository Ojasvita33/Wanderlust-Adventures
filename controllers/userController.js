const User = require('../models/User');
const Booking = require('../models/Bookings');

// Render User Profile (Protected Route)
exports.getProfile = async (req, res) => {
  if (req.session.user) {
      try {
          // Fetch all bookings for the logged-in user, sorted by bookingDate in descending order
          const bookings = await Booking.find({ user: req.session.user._id })
              .sort({ bookingDate: -1 })
              .populate('trip');

          // console.log("All Bookings in getProfile:", JSON.stringify(bookings, null, 2));

          res.render('profile', {
              title: 'Profile',
              user: req.session.user,
              bookings: bookings 
          });
      } catch (err) {
          console.error('Error fetching all bookings:', err);
          res.status(500).send('Error fetching bookings.');
      }
  } else {
      res.redirect('/auth/login');
  }
};

// Fetch All Users (Admin Feature - Optional)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

// Fetch a User by ID (Admin Feature - Optional)
exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};