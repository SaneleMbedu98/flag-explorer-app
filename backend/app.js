const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const CountryModel = require('./models/countryModel');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/countries', countryRoutes);

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

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

module.exports = { app };

