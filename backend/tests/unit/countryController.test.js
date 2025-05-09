const countryController = require('../../controllers/countryController');
const CountryModel = require('../../models/countryModel');
jest.mock('../../models/countryModel');

describe('Country Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('getAllCountries should return list of countries', async () => {
    const countries = [{ name: 'France', flag: 'france.png' }];
    CountryModel.getAllCountries.mockResolvedValue(countries);

    await countryController.getAllCountries(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(countries);
  });

  test('getCountryByName should return country details', async () => {
    const country = { name: 'France', population: 67391582, capital: 'Paris', flag: 'france.png' };
    req.params = { name: 'France' };
    CountryModel.getCountryByName.mockResolvedValue(country);

    await countryController.getCountryByName(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(country);
  });

  test('getCountryByName should handle errors', async () => {
    req.params = { name: 'Invalid' };
    CountryModel.getCountryByName.mockRejectedValue(new Error('Country not found'));

    await countryController.getCountryByName(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Country not found' });
  });
});
