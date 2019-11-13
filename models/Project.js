const mongoose = require('mongoose');

const { Schema } = mongoose;
// More about model: https://mongoosejs.com/docs/models.html

// Create Schema
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 50,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  github: {
    type: String,
  },
  category: {
    type: [String],
    required: true,
  },
  technology: {
    type: [String],
    required: true,
  },
  size: {
    type: Number,
    default: 1,
    min: 1,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 300,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
