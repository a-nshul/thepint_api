require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS, // Use environment variable
  },
});

const sendNotification = (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending notification email:', error);
    } else {
      console.log('Notification email sent:', info.response);
    }
  });
};

module.exports = sendNotification;
