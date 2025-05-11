const request = require('supertest');
const app = require('../../app'); // Path to your Express app
let server;

beforeAll((done) => {
  const PORT = process.env.PORT || 0;
  server = app.listen(PORT, () => {
    console.log(`🚀 Test server running on port ${PORT}`);
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('✅ Test server closed');
    done();
  });
});

describe('Country Routes', () => {
  it('GET /countries should return a list of countries', async () => {
    const res = await request(app).get('/countries');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});