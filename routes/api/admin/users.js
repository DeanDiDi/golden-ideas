/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const express = require('express');
const Admin = require('../../../models/Admin');
const auth = require('../../../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

// @route   POST api/admin/users/change-password
// @desc    Change current user's password
// @access  Private
router.post('/change-password', auth, (req, res) => {
  const { userId, password, newPassword } = req.body;
  if (!userId || !password || !newPassword) {
    return res.status(400).json({ msg: 'Missing required information when updating password' });
  }
  Admin.findById(userId)
    .then((adminUser) => {
      // Validate password
      bcrypt.compare(password, adminUser.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
          // Create salt & hash
          bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(newPassword, salt, (error, hash) => {
              if (error) throw error;
              Admin.findByIdAndUpdate(
                userId,
                { $set: { password: hash } },
                { new: true },
                (err, newAdminUser) => {
                  if (err) return res.status(400).json({ msg: 'Invalid credentials' });
                  jwt.sign(
                    { id: newAdminUser.id, username: newAdminUser.username }, // JWT payload
                    config.get('jwtSecret'),
                    { expiresIn: 3600 }, // One hour in seconds
                    (error, token) => {
                      if (error) throw error;
                      res.json({
                        token,
                        user: {
                          id: newAdminUser.id,
                          username: newAdminUser.username,
                        },
                      });
                    },
                  );
                },
              );
            });
          });
        });
    });
});

module.exports = router;
