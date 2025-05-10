// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Example route
// app.get('/', (req, res) => {
//   res.send('Flag Explorer Backend is running!');
// });

// // Import additional routes (if any)
// // const countryRoutes = require('./routes/countries');
// // app.use('/countries', countryRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const CountryModel = require('./models/countryModel');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Root route - Returns all countries
app.get('/', async (req, res) => {
  try {
    const countries = await CountryModel.getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching country data:', error);
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
});

// Country API routes
app.use('/countries', countryRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server and export it for testing
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running inside Docker on port ${PORT}`);
});

module.exports = { app, server };

