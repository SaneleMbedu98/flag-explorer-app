const axios = require('axios');

class CountryModel {
  async getAllCountries() {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data.map(country => ({
        name: country.name.common,
        population: country.population,
        capital: country.capital ? country.capital[0] : 'N/A',
        flag: country.flags.png
      }));
    } catch (error) {
      throw new Error('Failed to fetch countries');
    }
  }
  
  async getCountryByName(name) {
    if (!name) throw new Error('Invalid country name');
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      const country = response.data[0];
      return {
        name: country.name.common,
        population: country.population,
        capital: country.capital ? country.capital[0] : 'N/A',
        flag: country.flags.png
      };
    } catch (error) {
      throw new Error('Country not found');
    }
  }
  
}

module.exports = new CountryModel();
