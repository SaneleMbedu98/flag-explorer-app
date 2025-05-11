const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../../app'); // Do NOT require the server

describe('Country Routes', () => {
  // Extend Jest timeout for slow APIs or DB queries
  jest.setTimeout(15000);

  // Close DB connection after all tests
  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  });

  test('GET /countries should return a list of countries', async () => {
    const response = await request(app).get('/countries');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach((country) => {
      expect(country).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          population: expect.any(Number),
          capital: expect.any(String),
          flag: expect.any(String),
          languages: expect.any(String),
          region: expect.any(String),
          subregion: expect.any(String),
        })
      );
    });
  });

  test('GET /countries/France should return country details', async () => {
    const response = await request(app).get('/countries/France');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'France',
      population: expect.any(Number),
      capital: expect.any(String),
      flag: expect.any(String),
      languages: expect.any(String),
      region: expect.any(String),
      subregion: expect.any(String),
    });
  });

  test('GET /countries/Invalid should return 404 for unknown country', async () => {
    const response = await request(app).get('/countries/Invalid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Country not found' });
  });
});
