const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const CountryModel = require('./models/countryModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Root route - Returns all countries
app.get('/', async (req, res, next) => {
  try {
    const countries = await CountryModel.getAllCountries();
    if (!countries || countries.length === 0) {
      return res.status(404).json({ error: 'No countries found' });
    }
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching country data:', error.message);
    next(error);
  }
});

// Country API routes
app.use('/countries', countryRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running inside Docker on port ${PORT}`);
});

// Handle Docker container graceful shutdown
const shutdown = async () => {
  console.log('🛑 Shutting down server...');
  if (server) await new Promise(resolve => server.close(resolve));
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Export app and server for testing
module.exports = { app, server };