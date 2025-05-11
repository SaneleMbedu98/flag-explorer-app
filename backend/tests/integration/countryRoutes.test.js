// const request = require('supertest');
// const mongoose = require('mongoose');
// const { app } = require('../../app'); // Do NOT import the server directly
// let server;

// beforeAll((done) => {
//   server = app.listen(0, () => {
//     console.log('✅ Test server running on port 4000');
//     done();
//   });
// });

// afterAll(async () => {
//   // Close MongoDB connection if open
//   if (mongoose.connection.readyState === 1) {
//     await mongoose.connection.close();
//   }

//   // Close Express server
//   if (server && server.close) {
//     await new Promise((resolve) => server.close(resolve));
//   }
// });

// describe('Country Routes', () => {
//   jest.setTimeout(15000); // Extend timeout for external API if needed

//   test('GET /countries should return a list of countries', async () => {
//     const response = await request(server).get('/countries');
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//     expect(response.body.length).toBeGreaterThan(0);
//     expect(response.body).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           name: expect.any(String),
//           population: expect.any(Number),
//           capital: expect.any(String),
//           flag: expect.any(String),
//           languages: expect.any(String),
//           region: expect.any(String),
//           subregion: expect.any(String),
//         }),
//       ])
//     );
//   });

//   test('GET /countries/France should return country details', async () => {
//     const response = await request(server).get('/countries/France');
//     expect(response.status).toBe(200);
//     expect(response.body).toMatchObject({
//       name: 'France',
//       population: expect.any(Number),
//       capital: expect.any(String),
//       flag: expect.any(String),
//       languages: expect.any(String),
//       region: expect.any(String),
//       subregion: expect.any(String),
//     });
//   });

//   test('GET /countries/Invalid should return 404 for unknown country', async () => {
//     const response = await request(server).get('/countries/Invalid');
//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({ error: 'Country not found' });
//   });
// });
