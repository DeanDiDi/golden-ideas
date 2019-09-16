const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err));

// Use Routes
app.use('/api/users/', require('./routes/api/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
