// Email Utility - Gmail via Nodemailer
const nodemailer = require('nodemailer');

const GMAIL_EMAIL = process.env.GMAIL_EMAIL || 'wanderlustadventures@gmail.com';
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD || '';
const GMAIL_NAME = process.env.GMAIL_NAME || 'Wanderlust Adventures';

// Initialize Nodemailer with Gmail
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD
  }
});

/**
 * Send an email to a user
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 * @returns {Promise}
 */
async function sendMail(to, subject, text, html = null) {
  // If no password configured, just log it
  if (!GMAIL_PASSWORD) {
    console.warn('⚠️  Gmail password not configured. Email would be sent to:', to);
    console.log('   Subject:', subject);
    console.log('   To enable emails, add GMAIL_PASSWORD to your .env file');
    return true;
  }

  try {
    await gmailTransporter.sendMail({
      from: `${GMAIL_NAME}`,
      to,
      subject,
      text,
      html: html || text
    });
    console.log('✅ Email sent via Gmail to:', to);
    return true;
  } catch (error) {
    console.error('❌ Gmail error:', error.message);
    return false;
  }
}

module.exports = { sendMail };
