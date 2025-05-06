require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const Trip = require('./models/Trip'); 

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }
}));
app.use(methodOverride('_method')); 

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make session data available to views
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.messages = req.session.messages;
    delete req.session.messages;
    next();
});

// Routes
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes'); 

app.use('/auth', authRoutes);
app.use('/trips', tripRoutes); 
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/contact', contactRoutes); 
app.use('/', async (req, res) => { 
    try {
        const featuredTrips = await Trip.find().limit(3);
        res.render('home', { title: 'Wanderlust Adventures', featuredTrips: featuredTrips, user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading homepage.');
    }
});

// 404 Route
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
});

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Connect to MongoDB
mongoose.connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));