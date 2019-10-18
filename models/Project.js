const mongoose = require('mongoose');

const { Schema } = mongoose;
// More about model: https://mongoosejs.com/docs/models.html

// Create Schema
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  members: {
    type: Map,
    of: Number,
    default: {
      current: 1,
      maximum: 1,
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
