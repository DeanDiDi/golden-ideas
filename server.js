const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// express middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err));

// Use Routes
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/projects/', require('./routes/api/projects'));
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/email/', require('./routes/api/email'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
