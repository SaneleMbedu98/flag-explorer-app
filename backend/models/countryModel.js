const axios = require('axios');

class CountryModel {
  constructor() {
    this.cache = {
      allCountries: null,
      countryByName: new Map()
    };
  }

  /**
   * Fetch all countries with structured data (uses caching).
   */
  async getAllCountries() {
    if (this.cache.allCountries) {
      console.log('Returning cached countries');
      return this.cache.allCountries;
    }

    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      if (!response.data || response.data.length === 0) {
        throw new Error('Empty response from API');
      }

      this.cache.allCountries = response.data.map(country => ({
        name: country.name.common,
        population: country.population,
        capital: country.capital?.[0] || 'N/A',
        flag: country.flags?.png || 'N/A',
        region: country.region,
        subregion: country.subregion || 'Unknown',
        languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A'
      }));

      return this.cache.allCountries;
    } catch (error) {
      console.error('Error fetching countries:', error.message);
      throw new Error('Could not retrieve country data. Try again later.');
    }
  }

  /**
   * Fetch a single country by name (uses caching).
   */
  async getCountryByName(name) {
    if (!name) {
      throw new Error('Invalid country name');
    }

    // Check cache first
    if (this.cache.countryByName.has(name.toLowerCase())) {
      console.log(`Returning cached country: ${name}`);
      return this.cache.countryByName.get(name.toLowerCase());
    }

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      const country = response.data.find(c => c.name.common.toLowerCase() === name.toLowerCase());

      if (!country) {
        throw new Error('Country not found');
      }

      const formattedCountry = {
        name: country.name.common,
        population: country.population,
        capital: country.capital?.[0] || 'N/A',
        flag: country.flags?.png || 'N/A',
        region: country.region,
        subregion: country.subregion || 'Unknown',
        languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A'
      };

      this.cache.countryByName.set(name.toLowerCase(), formattedCountry); // Cache it

      return formattedCountry;
    } catch (error) {
      throw new Error('Country not found');
    }
  }
}

module.exports = new CountryModel();
