const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../app');

describe('Country Routes', () => {
  jest.setTimeout(15000); // Extend Jest timeout to avoid timeouts for API calls

  afterAll(async () => {
    // Close MongoDB connection properly
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    // Ensure Express server shuts down properly
    if (server && server.close) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('GET /countries should return a list of countries', async () => {
    const response = await request(app).get('/countries');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        population: expect.any(Number),
        capital: expect.any(String),
        flag: expect.any(String), // Handles dynamic flag URLs
        languages: expect.any(String), // Accepts real API data
        region: expect.any(String), // Allows region field if included
        subregion: expect.any(String), // Handles changing subregions
      })
    ]));
  });

  test('GET /countries/France should return country details', async () => {
    const response = await request(app).get('/countries/France');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'France',
      population: expect.any(Number),
      capital: 'Paris',
      flag: expect.any(String),
      languages: expect.any(String),
      region: expect.any(String), // Accepts region field
      subregion: expect.any(String), // Prevents failures due to API subregion changes
    });
  });

  test('GET /countries/Invalid should return 404 for unknown country', async () => {
    const response = await request(app).get('/countries/Invalid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Country not found' }); // Matches backend error response
  });
});
