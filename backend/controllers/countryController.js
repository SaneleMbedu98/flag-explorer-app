const CountryModel = require('../models/countryModel');

exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await CountryModel.getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};

exports.getCountryByName = async (req, res, next) => {
  try {
    const country = await CountryModel.getCountryByName(req.params.name);
    res.status(200).json(country);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
