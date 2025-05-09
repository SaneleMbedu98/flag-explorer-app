const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.get('/', countryController.getAllCountries); // Handles GET /countries
router.get('/:name', countryController.getCountryByName); // Handles GET /countries/{name}

module.exports = router;
