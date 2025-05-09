const request = require('supertest');
const app = require('../../app');
const axios = require('axios');

jest.mock('axios');

describe('Country Routes', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /countries should return list of countries', async () => {
    const mockCountries = [
      {
        name: { common: 'France' },
        flags: { png: 'france.png' },
        capital: ['Paris']
      }
    ];
    axios.get.mockResolvedValue({ data: mockCountries });

    const response = await request(app).get('/countries');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { name: 'France', flag: 'france.png', capital: 'Paris' }
    ]);
  });

  test('GET /countries/France should return country details', async () => {
    const mockCountry = [
      {
        name: { common: 'France' },
        population: 67391582,
        capital: ['Paris'],
        flags: { png: 'france.png' }
      }
    ];
    axios.get.mockResolvedValue({ data: mockCountry });

    const response = await request(app).get('/countries/France');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'France',
      population: 67391582,
      capital: 'Paris',
      flag: 'france.png'
    });
  });

  test('GET /countries/Invalid should return 404', async () => {
    axios.get.mockRejectedValue(new Error('Country not found'));

    const response = await request(app).get('/countries/Invalid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Country not found' });
  });
});
