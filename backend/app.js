const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const CountryModel = require('./models/countryModel'); // Ensure this path is correct

const app = express();
app.use(cors());

// Routes
app.use('/countries', countryRoutes);

// Root Route - Returns all countries
app.get('/', async (req, res) => {
  try {
    const countries = await CountryModel.getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export both app and server for integration testing
module.exports = { app, server };
