// middleware/authMiddleware.js
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (!user) {
                return res.redirect('/auth/login');
            }
            req.user = user;
            next();
        } catch (err) {
            console.error('Error in authMiddleware:', err);
            res.redirect('/auth/login');
        }
    } else {
        res.redirect('/auth/login');
    }
};
