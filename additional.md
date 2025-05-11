# Flag Explorer App

## Overview

The Flag Explorer App is a web application designed to help users explore and learn about flags from different countries. Built with React for the frontend and a Node.js/Express backend, it fetches flag data from a public API (e.g., REST Countries API) and provides an interactive interface for users to browse, search, and view detailed information about each flag.

## Features

* **Interactive Flag Gallery** : Browse flags with responsive grid layouts.
* **Search Functionality** : Search for countries by name or region.
* **Detailed View** : Click on a flag to view country details like capital, population, and region.
* **Responsive Design** : Optimized for both desktop and mobile devices.

## Tech Stack

* **Frontend** : React, TypeScript, Tailwind CSS
* **Backend** : Node.js, Express
* **API** : REST Countries API (or similar)
* **Testing** : Jest, React Testing Library, Supertest
* **Deployment** : Vercel (frontend), Heroku (backend)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SaneleMbedu98/flag-explorer-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd flag-explorer-app
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```
4. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```
5. Set up environment variables:
   * Create a `.env` file in the `server` directory.
   * Add necessary variables (e.g., `API_URL`, `PORT`).
6. Run the backend:
   ```bash
   cd server
   npm start
   ```
7. Run the frontend:
   ```bash
   cd client
   npm start
   ```

## Usage

* Access the app at `http://localhost:3000` (frontend) after starting both servers.
* Use the search bar to find specific countries or browse the flag gallery.
* Click on a flag to view detailed information.

## Testing

* **Frontend Tests** : Run `npm test` in the `client` directory to execute Jest and React Testing Library tests.
* **Backend Tests** : Run `npm test` in the `server` directory to execute Supertest and Jest tests for API endpoints.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Other Important Information and Challenges

### CORS Issues

During development, the app encountered significant Cross-Origin Resource Sharing (CORS) challenges, particularly when the frontend (running on `http://localhost:3000`) made requests to the backend (running on `http://localhost:5000`). The browser blocked these requests due to the same-origin policy, resulting in errors like:

```
Access to fetch at 'http://localhost:5000/api/flags' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

#### Solutions Implemented

* **Backend CORS Configuration** : Added CORS middleware to the Express backend to allow requests from the frontend origin:

```javascript
  const cors = require('cors');
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
```

  This explicitly allowed the frontend domain during development. For production, the origin was updated to the deployed frontend URL (e.g., `https://flag-explorer-app.vercel.app`).

* **Proxy for Development** : Configured a proxy in the frontend's `package.json` to forward API requests to the backend, bypassing CORS issues locally:

```json
  "proxy": "http://localhost:5000"
```

* **Preflight Request Handling** : Ensured the backend properly handled `OPTIONS` preflight requests by including necessary headers like `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers`.
* **Challenges with Third-Party APIs** : When fetching data from the REST Countries API, CORS restrictions were occasionally encountered. To mitigate this, the backend acted as a proxy to make server-to-server requests, which are not subject to CORS, and then relayed the data to the frontend.

#### Lessons Learned

* Always configure CORS explicitly for specific origins in production to enhance security, avoiding the wildcard (`*`) except for public APIs.
* Test CORS configurations early in development to avoid surprises during deployment.
* Be cautious with third-party APIs that may not support CORS, requiring a backend proxy workaround.

### Backend Testing Problems

Testing the backend posed several challenges, particularly with ensuring reliable and comprehensive test coverage for API endpoints.

#### Issues Faced

* **Asynchronous API Calls** : Tests using Supertest to mock API requests occasionally failed due to improper handling of asynchronous operations, leading to race conditions or incomplete assertions.
* **Mocking External APIs** : The backend relied on the REST Countries API, which introduced variability in tests due to network latency or rate limits. Mocking this API was complex and required additional setup.
* **Environment Variables** : Tests failed when environment variables (e.g., `API_URL`) were not properly configured in the test environment, causing inconsistencies between development and CI/CD pipelines.
* **Database Integration** : While the app primarily used an external API, some endpoints cached data in a local database (e.g., MongoDB). Setting up and tearing down the database for tests was time-consuming and error-prone.

#### Solutions Implemented

* **Improved Async Handling** : Used `async/await` with Supertest to ensure tests waited for responses:

```javascript
  const request = require('supertest');
  const app = require('../app');

  describe('GET /api/flags', () => {
    it('should return a list of flags', async () => {
      const res = await request(app).get('/api/flags');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
```

* **Mocking with Nock** : Utilized the `nock` library to mock external API responses, ensuring consistent test results:

```javascript
  const nock = require('nock');
  nock('https://restcountries.com')
    .get('/v3.1/all')
    .reply(200, [{ name: { common: 'Test Country' }, flags: { png: 'flag.png' } }]);
```

* **Test Environment Setup** : Created a separate `.env.test` file and used `dotenv` to load test-specific environment variables. Ensured CI/CD pipelines loaded these variables correctly.
* **In-Memory Database** : Switched to an in-memory MongoDB instance (using `mongodb-memory-server`) for tests to avoid persistent database issues:

```javascript
  const { MongoMemoryServer } = require('mongodb-memory-server');
  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    // Connect to in-memory DB
  });

  afterAll(async () => {
    await mongod.stop();
  });
```

#### Lessons Learned

* Mock external dependencies to reduce test flakiness and improve speed.
* Invest in robust test setup scripts to handle environment variables and database state.
* Regularly run tests in a CI/CD environment to catch configuration issues early.

### Other Challenges

* **API Rate Limits** : The REST Countries API occasionally imposed rate limits, causing intermittent failures in development and testing. This was mitigated by implementing caching in the backend using Redis or a simple in-memory store.
* **Deployment Sync** : Coordinating frontend and backend deployments (Vercel and Heroku) required careful management of environment variables and CORS settings to ensure compatibility.
* **Performance Optimization** : Large flag image files slowed down the frontend. Lazy loading and image optimization techniques (e.g., using `srcset` for responsive images) were implemented to improve load times.

#### Future Improvements

* Implement a more robust caching strategy to handle API rate limits and improve response times.
* Explore GraphQL for more flexible data fetching, reducing over-fetching issues with the REST API.
* Enhance test coverage for edge cases, particularly for error handling and network failures.
