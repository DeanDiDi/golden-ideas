const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  collection: 'admin', // Specify collection name
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
