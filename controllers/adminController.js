const Trip = require('../models/Trip');
const User = require('../models/User');

exports.getUsersManagement = async (req, res) => {
  try {
    const search = req.query.search || '';
    const filter = search ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }, { username: new RegExp(search, 'i') }] } : {};
    
    const users = await User.find(filter).sort({ _id: -1 });
    res.render('admin-users', {
      title: 'Manage Users',
      user: req.session.user,
      users,
      search,
      success: req.query.success
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load users.' });
  }
};

exports.toggleUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Role progression: user -> moderator -> admin -> user (cycles)
    const roleOrder = ['user', 'moderator', 'admin'];
    const currentIndex = roleOrder.indexOf(user.role);
    const nextIndex = (currentIndex + 1) % roleOrder.length;
    user.role = roleOrder[nextIndex];
    
    await user.save();
    
    res.json({ success: true, newRole: user.role, message: `User is now ${user.role}` });
  } catch (err) {
    console.error('Error toggling role:', err);
    res.status(500).json({ success: false, message: 'Failed to toggle role' });
  }
};

exports.getTripsManagement = async (req, res) => {
  try {
    const search = req.query.search || '';
    const filter = search ? { $or: [{ name: new RegExp(search, 'i') }, { 'details.Region': new RegExp(search, 'i') }] } : {};
    
    const trips = await Trip.find(filter).sort({ date: -1 });
    res.render('admin-trips', {
      title: 'Manage Trips',
      user: req.session.user,
      trips,
      search,
      success: req.query.success
    });
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load trips.' });
  }
};

exports.getAddTrip = (req, res) => {
  res.render('admin-trip-form', {
    title: 'Add Trip',
    user: req.session.user,
    trip: null,
    error: null
  });
};

exports.postAddTrip = async (req, res) => {
  const { name, description, price, date, itinerary, region, duration, difficulty, accommodation, weatherLocation, mapLocation, image, images } = req.body;

  try {
    const itineraryArray = itinerary ? itinerary.split('\n').filter(i => i.trim()) : [];
    
    // Handle primary image: uploaded file takes precedence
    let primaryImage = req.file ? `/uploads/${req.file.filename}` : image || '';
    
    // Parse additional images: can be comma-separated string or array
    let imagesArray = [];
    if (images && images.trim().length > 0) {
      imagesArray = images.split(',').map(img => img.trim()).filter(img => img.length > 0);
    }
    
    // If we have a primary image, make it the first in images array
    if (primaryImage && !imagesArray.includes(primaryImage)) {
      imagesArray.unshift(primaryImage);
    }
    
    const newTrip = new Trip({
      name,
      description,
      price: Number(price),
      date,
      itinerary: itineraryArray,
      details: {
        Region: region,
        Duration: duration,
        Difficulty: difficulty,
        Accommodation: accommodation
      },
      image: primaryImage,
      images: imagesArray,
      weatherLocation,
      mapLocation
    });

    await newTrip.save();
    res.redirect('/admin/trips?success=Trip added successfully');
  } catch (err) {
    console.error('Error adding trip:', err);
    res.status(500).render('admin-trip-form', {
      title: 'Add Trip',
      user: req.session.user,
      trip: null,
      error: 'Failed to add trip: ' + err.message
    });
  }
};

exports.getEditTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).render('404', { title: 'Trip Not Found' });
    }

    res.render('admin-trip-form', {
      title: 'Edit Trip',
      user: req.session.user,
      trip,
      error: null
    });
  } catch (err) {
    console.error('Error fetching trip:', err);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load trip.' });
  }
};

exports.postEditTrip = async (req, res) => {
  const { name, description, price, date, itinerary, region, duration, difficulty, accommodation, weatherLocation, mapLocation, image, images } = req.body;

  try {
    const itineraryArray = itinerary ? itinerary.split('\n').filter(i => i.trim()) : [];
    
    // Handle primary image: uploaded file takes precedence
    let primaryImage = req.file ? `/uploads/${req.file.filename}` : image || '';
    
    // Parse additional images: can be comma-separated string or array
    let imagesArray = [];
    if (images && images.trim().length > 0) {
      imagesArray = images.split(',').map(img => img.trim()).filter(img => img.length > 0);
    }
    
    // If we have a primary image, make it the first in images array
    if (primaryImage && !imagesArray.includes(primaryImage)) {
      imagesArray.unshift(primaryImage);
    }

    await Trip.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price: Number(price),
        date,
        itinerary: itineraryArray,
        details: {
          Region: region,
          Duration: duration,
          Difficulty: difficulty,
          Accommodation: accommodation
        },
        image: primaryImage,
        images: imagesArray,
        weatherLocation,
        mapLocation
      },
      { new: true }
    );

    res.redirect('/admin/trips?success=Trip updated successfully');
  } catch (err) {
    console.error('Error updating trip:', err);
    res.status(500).render('error', { title: 'Error', message: 'Failed to update trip.' });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Trip deleted' });
  } catch (err) {
    console.error('Error deleting trip:', err);
    res.status(500).json({ success: false, message: 'Failed to delete trip' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const [tripCount, userCount] = await Promise.all([
      Trip.countDocuments(),
      User.countDocuments()
    ]);

    res.render('admin', {
      title: 'Admin Dashboard',
      user: req.session.user,
      stats: { tripCount, userCount }
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load admin dashboard.' });
  }
};
