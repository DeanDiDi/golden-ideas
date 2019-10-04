const mongoose = require('mongoose');

const { Schema } = mongoose;
// More about model: https://mongoosejs.com/docs/models.html

// Create Schema
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
