// SendGrid Email Utility for Wanderlust Adventures
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Send an email to a user
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 * @returns {Promise}
 */
async function sendMail(to, subject, text, html = null) {
    const msg = {
        to,
        from: 'noreply@wanderlust.com', // Change to your verified sender
        subject,
        text,
        html: html || text
    };
    try {
        await sgMail.send(msg);
        console.log('Email sent to', to);
        return true;
    } catch (error) {
        console.error('SendGrid error:', error.response ? error.response.body : error.message);
        return false;
    }
}

module.exports = { sendMail };
