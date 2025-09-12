<<<<<<< HEAD
// authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Render Signup Page
exports.getSignup = (req, res) => {
    let popupMessage = null;
    if (req.session.messages && req.session.messages.popup) {
        popupMessage = req.session.messages.popup;
        req.session.messages = {}; // Clear the session message here
    }
    res.locals.popupMessage = popupMessage; // Explicitly set res.locals
    res.render('signup', { title: 'Sign Up', messages: req.session.messages });
};

// Handle Signup Submission
exports.postSignup = async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !name.trim()) {
        req.session.messages = { error: 'Name is required.' };
        return res.redirect('/auth/signup');
    }

    if (!username || !username.trim()) {
        req.session.messages = { error: 'Username is required.' };
        return res.redirect('/auth/signup');
    }

    if (!email || !email.trim()) {
        req.session.messages = { error: 'Email is required.' };
        return res.redirect('/auth/signup');
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        req.session.messages = { error: 'Invalid email format.' };
        return res.redirect('/auth/signup');
    }

    // Check for existing email and username first
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
        req.session.messages = { popup: 'Account with this email already exists!' };
        return res.redirect('/auth/signup');
    }

    const existingUserUsername = await User.findOne({ username });
    if (existingUserUsername) {
        req.session.messages = { popup: 'Username already exists. Please choose a different username.' };
        return res.redirect('/auth/signup');
    }

    // Then check password length
    if (!password || password.length < 8) {
        req.session.messages = { popup: 'Password must be at least 8 characters long.' };
        return res.redirect('/auth/signup');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, password: hashedPassword });
        await user.save();
        req.session.messages = { success: 'Signup successful! Please log in.' };
        res.redirect('/auth/login');
    } catch (err) {
        console.error('POST /auth/signup - Signup error:', err);
        req.session.messages = { error: 'Error creating account.' };
        return res.redirect('/auth/signup');
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
    res.render('login', { title: 'Login', messages: req.session.messages, req: req });
    req.session.messages = {};
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
=======
// authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Render Signup Page
exports.getSignup = (req, res) => {
    let popupMessage = null;
    if (req.session.messages && req.session.messages.popup) {
        popupMessage = req.session.messages.popup;
        req.session.messages = {}; // Clear the session message here
    }
    res.locals.popupMessage = popupMessage; // Explicitly set res.locals
    res.render('signup', { title: 'Sign Up', messages: req.session.messages });
};

// Handle Signup Submission
exports.postSignup = async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !name.trim()) {
        req.session.messages = { error: 'Name is required.' };
        return res.redirect('/auth/signup');
    }

    if (!username || !username.trim()) {
        req.session.messages = { error: 'Username is required.' };
        return res.redirect('/auth/signup');
    }

    if (!email || !email.trim()) {
        req.session.messages = { error: 'Email is required.' };
        return res.redirect('/auth/signup');
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        req.session.messages = { error: 'Invalid email format.' };
        return res.redirect('/auth/signup');
    }

    // Check for existing email and username first
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
        req.session.messages = { popup: 'Account with this email already exists!' };
        return res.redirect('/auth/signup');
    }

    const existingUserUsername = await User.findOne({ username });
    if (existingUserUsername) {
        req.session.messages = { popup: 'Username already exists. Please choose a different username.' };
        return res.redirect('/auth/signup');
    }

    // Then check password length
    if (!password || password.length < 8) {
        req.session.messages = { popup: 'Password must be at least 8 characters long.' };
        return res.redirect('/auth/signup');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, password: hashedPassword });
        await user.save();
        req.session.messages = { success: 'Signup successful! Please log in.' };
        res.redirect('/auth/login');
    } catch (err) {
        console.error('POST /auth/signup - Signup error:', err);
        req.session.messages = { error: 'Error creating account.' };
        return res.redirect('/auth/signup');
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
    res.render('login', { title: 'Login', messages: req.session.messages, req: req });
    req.session.messages = {};
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
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f
