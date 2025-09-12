exports.getContactPage = (req, res) => {
    res.render('contact', { title: 'Contact Us', message: req.session.message });
    req.session.message = null; // Clear message after rendering
};

exports.handleContactFormSubmission = async (req, res) => {
    const { name, email, subject, message } = req.body;
    res.status(200).json({ success: 'Thanks for reaching out. We\'ll get back to you soon.' });
};
