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

  // configure your transport options inside 'config/default.json'
  const transporter = nodemailer.createTransport(config.get('transportOptions'));

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

    res.json(info.response);
  });
});

module.exports = router;
