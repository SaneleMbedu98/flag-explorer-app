const request = require('supertest');
const mongoose = require('mongoose');
// const nock = require('nock');
const { app, server } = require('../../app');

describe('Country Routes', () => {
  // Extend Jest timeout for API calls
  jest.setTimeout(15000);

  // Mock REST Countries API before all tests
  // beforeAll(() => {
  //   nock('https://restcountries.com')
  //     .get('/v3.1/all')
  //     .reply(200, [
  //       {
  //         name: { common: 'France' },
  //         population: 67391582,
  //         capital: ['Paris'],
  //         flags: { png: 'https://flagcdn.com/w320/fr.png' },
  //         languages: { fra: 'French' },
  //         region: 'Europe',
  //         subregion: 'Western Europe',
  //       },
  //     ])
  //     .get('/v3.1/name/France')
  //     .reply(200, [
  //       {
  //         name: { common: 'France' },
  //         population: 67391582,
  //         capital: ['Paris'],
  //         flags: { png: 'https://flagcdn.com/w320/fr.png' },
  //         languages: { fra: 'French' },
  //         region: 'Europe',
  //         subregion: 'Western Europe',
  //       },
  //     ])
  //     .get('/v3.1/name/Invalid')
  //     .reply(404, { message: 'Not Found' });
  // });

  // Cleanup after all tests
  afterAll(async () => {
    // Close MongoDB connection if open
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }

    // Close Express server
    if (server && server.close) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('GET /countries should return a list of countries', async () => {
    const response = await request(app).get('/countries');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          population: expect.any(Number),
          capital: expect.any(String),
          flag: expect.any(String),
          languages: expect.any(String),
          region: expect.any(String),
          subregion: expect.any(String),
        }),
      ])
    );
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