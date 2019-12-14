/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const Admin = require('../../../models/Admin');

const router = express.Router();

// @route   POST api/admin/auth
// @desc    Authenticate admin user
// @access  Public
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({ msg: 'Please enter all fields.' });
  }

  // Check for existing user
  Admin.findOne({ username })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: 'Admin user does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
          jwt.sign(
            { id: user.id, username: user.username }, // JWT payload
            config.get('jwtSecret'),
            { expiresIn: 3600 }, // One hour in seconds
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                },
              });
            },
          );
        });
    });
});

module.exports = router;
