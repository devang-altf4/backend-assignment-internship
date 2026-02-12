const express = require('express');

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// basic health check
app.get('/', (req, res) => {
  res.json({ msg: 'API is running...' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
