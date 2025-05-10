const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const CountryModel = require('./models/countryModel'); // Ensure correct path

const app = express();
app.use(cors());

// Routes
app.use('/countries', countryRoutes);

// Root Route - Returns all countries
app.get('/', async (req, res, next) => {
  try {
    const countries = await CountryModel.getAllCountries();
    if (!countries || countries.length === 0) {
      return res.status(404).json({ error: 'No countries found' });
    }
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    next(error);
  }
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  const statusCode = err.status || 500; // Preserve custom status codes
  res.status(statusCode).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Clean shutdown logic to prevent "EADDRINUSE" errors in tests
const shutdown = async () => {
  console.log('🛑 Shutting down server...');
  if (server) await new Promise(resolve => server.close(resolve));
  process.exit(0);
};

// Handle graceful exit signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Export both app and server for integration testing
module.exports = { app, server };
