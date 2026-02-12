const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const apiVersion = require('./middleware/apiVersion');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// load env vars
dotenv.config();

// connect to db
connectDB();

const app = express();

// security middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// body parser
app.use(express.json({ limit: '10kb' }));
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
