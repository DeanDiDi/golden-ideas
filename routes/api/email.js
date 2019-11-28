/* eslint-disable no-console */
/* eslint-disable no-shadow */
const express = require('express');
const nodemailer = require('nodemailer');
const config = require('config');

const router = express.Router();

// @route   POST api/email/send
// @desc    Send email
// @access  Public
router.post('/send', (req, res) => {
  const { message } = req.body;
  if (typeof message === 'undefined' || message === null) {
    res.json({
      success: false,
      error: 'message is null or undefined',
    });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.utoronto.ca',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: config.get('emailAuth'), // configure your authentication info inside 'config/default.json'
  });

  // verify connection configuration
  transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(`Error occurred. ${err.message}`);
      res.json({ err });
    }

    res.json({
      success: true,
      response: info.response,
    });
  });
});

module.exports = router;
