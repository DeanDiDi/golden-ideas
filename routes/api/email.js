/* eslint-disable no-console */
/* eslint-disable no-shadow */
const express = require('express');
const nodemailer = require('nodemailer');

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

  // Generate SMTP service account from ethereal.email
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error(`Failed to create a testing account. ${err.message}`);
      res.json({ err });
    }

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`);
        res.json({ err });
      }

      res.json({
        success: true,
        messageId: info.messageId,
        url: nodemailer.getTestMessageUrl(info),
      });
    });
  });
});

module.exports = router;
