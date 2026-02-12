const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// load env vars
dotenv.config();

// connect to db
connectDB();

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// basic health check
app.get('/', (req, res) => {
  res.json({ msg: 'API is running...' });
});

// routes
app.use('/api/v1/auth', require('./routes/v1/auth'));
app.use('/api/v1/users', require('./routes/v1/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
