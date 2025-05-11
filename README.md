
# Flag Explorer App

Welcome to the  **Flag Explorer App** , a web application that allows users to explore and learn about flags from different countries. This project is built with a Node.js backend and a React frontend, containerized using Docker for easy deployment.

## Prerequisites

To run this application, you need the following installed on your system:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/) (optional, for multi-container setup)

## Getting Started

Follow these steps to set up and run the Flag Explorer App using Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/SaneleMbedu98/flag-explorer-app.git
cd flag-explorer-app
```

### 2. Build and Run with Docker

The application consists of a backend and frontend, both containerized. Use the following commands to build and run the containers:

#### Option 1: Using Docker Compose (Recommended)

If a `docker-compose.yml` file is provided in the repository, you can run both services with a single command:

```bash
docker-compose up --build
```

This will build and start the backend and frontend containers, automatically configuring networking between them.

#### Option 2: Manual Docker Commands

If you prefer to run the containers individually:

 **Backend** :

```bash
cd backend
docker build -t flag-explorer-backend:latest .
docker run -d -p 3000:3000 --name flag-explorer-backend flag-explorer-backend:latest
```

 **Frontend** :

```bash
cd frontend
docker build -t flag-explorer-frontend:latest .
docker run -d -p 5000:5000 --name flag-explorer-frontend flag-explorer-frontend:latest
```

### 3. Access the Application

Once the containers are running, you can access the Flag Explorer App at the following URL:

* **URL** : `http://localhost:5000`
* **Ports** :
* Frontend: `5000` (mapped to the container's port 5000)
* Backend: `3000` (mapped to the container's port 3000, used for API requests)

Open your browser and navigate to `http://localhost:5000` to start exploring flags!

### 4. Stopping the Application

To stop the running containers:

#### With Docker Compose:

```bash
docker-compose down
```

#### Manually:

```bash
docker stop flag-explorer-backend
docker stop flag-explorer-frontend
docker rm flag-explorer-backend
docker rm flag-explorer-frontend
```

## Directory Structure

The project is organized into distinct directories for the backend, frontend, and supporting files. Below is a detailed breakdown of the directory structure:

```
flag-explorer-app/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions YAML file for CI/CD pipeline (runs tests, builds, and packages app)
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── countryController.js  # Handles API logic for /countries and /countries/:name endpoints
│   │   ├── routes/
│   │   │   └── countryRoutes.js     # Defines API routes for country endpoints
│   │   ├── services/
│   │   │   └── countryService.js    # Fetches data from REST Countries API or cache
│   │   ├── models/
│   │   │   └── cache.js            # Optional: Schema for caching country data (e.g., Redis or MongoDB)
│   │   └── utils/
│   │       └── api.js              # Helper functions for API requests and error handling
│   ├── tests/
│   │   ├── unit/
│   │   │   └── countryController.test.js  # Unit tests for controller logic
│   │   └── integration/
│   │       └── countryRoutes.test.js      # Integration tests for API endpoints
│   ├── .env                        # Environment variables (e.g., API_URL, PORT)
│   ├── .dockerignore               # Files to exclude from Docker build (e.g., node_modules)
│   ├── Dockerfile                  # Docker configuration for backend container
│   ├── package.json                # Backend dependencies and scripts
│   ├── server.js                   # Entry point for Express server
│   └── swagger.yaml                # Swagger documentation for API (/countries, /countries/:name)
├── frontend/
│   ├── public/
│   │   ├── index.html              # HTML template for React app
│   │   └── favicon.ico             # App favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── FlagGrid.js         # Component for flag grid on Home Screen
│   │   │   ├── FlagCard.js         # Component for individual flag display
│   │   │   └── CountryDetails.js   # Component for Detail Screen
│   │   ├── pages/
│   │   │   ├── Home.js             # Home Screen page
│   │   │   └── Details.js          # Detail Screen page
│   │   ├── services/
│   │   │   └── api.js              # API client for backend requests
│   │   ├── styles/
│   │   │   └── tailwind.css        # Tailwind CSS or custom styles
│   │   ├── App.js                  # Main React app component
│   │   ├── index.js                # React entry point
│   │   └── tests/
│   │       ├── FlagGrid.test.js    # Unit tests for FlagGrid component
│   │       └── api.test.js         # Integration tests for API calls
│   ├── .env                        # Environment variables (e.g., REACT_APP_API_URL)
│   ├── .dockerignore               # Files to exclude from Docker build
│   ├── Dockerfile                  # Docker configuration for frontend container
│   ├── package.json                # Frontend dependencies and scripts
│   └── tailwind.config.js          # Tailwind CSS configuration
├── .dockerignore                   # Root-level Docker ignore file
├── .gitignore                      # Git ignore file (e.g., ignores node_modules, .env)
├── docker-compose.yml              # Docker Compose configuration for multi-container setup
├── LICENSE                         # MIT License file
└── README.md                       # This README file
```

### Directory Descriptions

* **`.github/workflows/ci.yml`** : Defines the CI/CD pipeline using GitHub Actions to run tests, build the application, and package artifacts for deployment.
* **`backend/`** : Contains the Node.js/Express backend implementing the REST API.
* `src/`: Core backend code, organized using MVC architecture.
* `tests/`: Unit and integration tests using Jest and Supertest.
* `Dockerfile`: Configures the backend container with Node.js and dependencies.
* `swagger.yaml`: Documents the API endpoints per the provided Swagger spec.
* **`frontend/`** : Contains the React frontend for the flag explorer UI.
* `public/`: Static assets for the React app.
* `src/`: React components, pages, services, and tests.
* `Dockerfile`: Configures the frontend container with Node.js and Nginx for serving the built app.
* **`docker-compose.yml`** : Orchestrates the backend and frontend containers, defining services, ports, and networking.
* **`.gitignore`** : Excludes unnecessary files (e.g., `node_modules`, `.env`, build artifacts) from version control.
* **`LICENSE`** : Specifies the MIT License for the project.

## Troubleshooting

* **Port Conflicts** : If ports `3000` or `5000` are already in use, modify the host port in the `docker run` command (e.g., `-p 8081:5000`) or in `docker-compose.yml`.
* **Docker Issues** : Ensure Docker is running and you have sufficient permissions (e.g., run Docker commands with `sudo` on Linux if needed).
* **Application Errors** : Check container logs for debugging:

```bash
docker logs flag-explorer-backend
docker logs flag-explorer-frontend
```

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes. Ensure your code passes tests and follows the project's coding standards.

## License

This project is licensed under the MIT License. See the [LICENSE](https://grok.com/chat/LICENSE) file for details.

## Other Important Information and Challenges

### CORS Issues

During development, Cross-Origin Resource Sharing (CORS) issues arose when the frontend (`http://localhost:5000`) made requests to the backend (`http://localhost:3000`). Browser errors indicated missing `Access-Control-Allow-Origin` headers.

#### Solutions Implemented

* **Backend CORS Middleware** : Added CORS to the Express server:

```javascript
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
```

  In production, the origin was updated to the deployed frontend URL.

* **Docker Networking** : Used Docker Compose to place frontend and backend in the same network, simplifying communication.
* **Proxy in Development** : Configured a proxy in the frontend's `package.json`:

```json
  "proxy": "http://localhost:3000"
```

#### Lessons Learned

* Explicitly define allowed origins for security.
* Test CORS configurations early to avoid deployment issues.
* Use Docker networking to streamline local development.

### Backend Testing Problems

Testing the backend presented challenges, particularly with external API dependencies and asynchronous operations.

#### Issues Faced

* **External API Variability** : The REST Countries API (`https://restcountries.com/v3.1/all`) introduced latency and rate limits, causing test inconsistencies.
* **Async Handling** : Supertest tests failed due to unhandled asynchronous calls.
* **Environment Variables** : Tests required consistent `.env` settings.

#### Solutions Implemented

* **Mocking with Nock** : Mocked REST Countries API responses:

```javascript
  const nock = require('nock');
  nock('https://restcountries.com').get('/v3.1/all').reply(200, [{ name: { common: 'Test' }, flags: { png: 'flag.png' } }]);
```

* **Async Tests** : Used `async/await` in Supertest:

```javascript
  const request = require('supertest');
  describe('GET /countries', () => {
    it('returns countries', async () => {
      const res = await request(app).get('/countries');
      expect(res.status).toBe(200);
    });
  });
```

* **Test Environment** : Used `.env.test` for test-specific variables.

#### Lessons Learned

* Mock external APIs to ensure reliable tests.
* Configure test environments to mirror production settings.

### Other Challenges

* **API Rate Limits** : Cached API responses in the backend (using Redis or in-memory storage) to handle REST Countries API limits.
* **Docker Image Size** : Optimized Dockerfiles to reduce image size (e.g., multi-stage builds).
* **Performance** : Implemented lazy loading for flag images to improve frontend performance.
