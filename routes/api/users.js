/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users));
});

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(404).json({ msg: 'Please enter all fields.' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: 'User already existed' });

      // Create newUser object
      const newUser = new User({
        name,
        email,
        password,
      });

      // Create salt & hash
      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then((savedNewUser) => {
              jwt.sign(
                { id: savedNewUser.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (error, token) => {
                  if (error) throw error;
                  res.json({
                    token,
                    user: {
                      id: savedNewUser.id,
                      name: savedNewUser.name,
                      email: savedNewUser.email,
                    },
                  });
                },
              );
            });
        });
      });
    });
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
