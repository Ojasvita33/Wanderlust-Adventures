const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Render Signup Page
exports.getSignup = (req, res) => {
    res.render('signup', { title: 'Sign Up', messages: req.session.messages });
    req.session.messages = {}; 
};

// Handle Signup Submission
exports.postSignup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.messages = { error: 'Validation failed. Please check the form.' };
        return res.redirect('/auth/signup');
    }

    const { name, username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            req.session.messages = { error: 'Username or email already exists.' };
            return res.redirect('/auth/signup');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, password: hashedPassword });
        await user.save();
        req.session.messages = { success: 'Signup successful! Please log in.' };
        res.redirect('/auth/login');
    } catch (err) {
        console.error('Signup error:', err);
        req.session.messages = { error: 'Error creating account.' };
        res.redirect('/auth/signup');
    }
};

exports.setRedirect = (req, res) => {
    req.session.redirectTo = req.query.redirectTo;
    res.redirect('/auth/login');
};

// Handle Login Submission
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const redirectTo = req.session.redirectTo; 
    delete req.session.redirectTo;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            req.session.messages = { error: 'Invalid username or password.' };
            return res.redirect('/auth/login');
        }
        req.session.user = user;
        req.session.userId = user._id;

        if (redirectTo) {
            return res.redirect(redirectTo);
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        console.error('Login error:', err);
        req.session.messages = { error: 'Error during login.' };
        res.redirect('/auth/login');
    }
};

// Render Login Page
exports.getLogin = (req, res) => {
    res.render('login', { title: 'Login', messages: res.locals.messages, req: req }); 
};

// Handle Logout
exports.getLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.redirect('/'); 
    });
};