const request = require('supertest');
const mongoose = require('mongoose'); // Ensure it's imported for connection handling
const { app, server } = require('../../app');

describe('Country Routes', () => {
  afterAll(async () => {
    // Close MongoDB connection if open
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    // Ensure server is properly closed after tests
    if (server && server.close) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('GET /countries should return list of countries', async () => {
    const response = await request(app).get('/countries');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        population: expect.any(Number),
        capital: expect.any(String),
        flag: expect.any(String),
        languages: expect.any(String),
        subregion: expect.any(String),
      })
    ]));
  }, 10000); // Extend timeout to 10 sec

  test('GET /countries/France should return country details', async () => {
    const response = await request(app).get('/countries/France');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'France',
      population: expect.any(Number),
      capital: 'Paris',
      flag: expect.any(String),
      languages: expect.any(String),
      subregion: expect.any(String),
    });
  });

  test('GET /countries/Invalid should return 404 for unknown country', async () => {
    const response = await request(app).get('/countries/Invalid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Failed to fetch country data' });
  });
});
