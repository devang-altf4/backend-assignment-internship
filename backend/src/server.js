const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const apiVersion = require('./middleware/apiVersion');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

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

// api version header
app.use(apiVersion);

// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/api/v1/auth', require('./routes/v1/auth'));
app.use('/api/v1/users', require('./routes/v1/users'));
app.use('/api/v1/tasks', require('./routes/v1/tasks'));

// error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
