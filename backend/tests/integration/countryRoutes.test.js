const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../app');

describe('Country Routes', () => {
  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    if (server && server.close) {
      await server.close();
    }
  });

  test('GET /countries should return list of countries', async () => {
    const response = await request(app).get('/countries');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        name: 'France',
        population: 67391582,
        capital: 'Paris',
        flag: 'france.png',
        languages: 'N/A',
        subregion: 'Unknown',
      },
    ]);
  });

  test('GET /countries/France should return country details', async () => {
    const response = await request(app).get('/countries/France');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'France',
      population: 67391582,
      capital: 'Paris',
      flag: 'france.png',
      languages: 'N/A',
      subregion: 'Unknown',
    });
  });

  test('GET /countries/Invalid should return 404 for unknown country', async () => {
    const response = await request(app).get('/countries/Invalid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Failed to fetch country data' });
  });
});
