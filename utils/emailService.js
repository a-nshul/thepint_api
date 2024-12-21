require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use the environment variable for email
    pass: process.env.EMAIL_PASS, // Use the environment variable for password
  },
});

// Function to send an email notification
const sendEmail = (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use the environment variable for sender email
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
