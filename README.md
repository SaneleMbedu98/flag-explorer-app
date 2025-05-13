
# Flag Explorer App

Welcome to the  **Flag Explorer App** , a web application for exploring and learning about country flags. Built with a **Node.js** backend and **React** frontend, it’s containerized using **Docker** for seamless deployment. Both services are deployed on Render:

* **Frontend** : [https://sanemembedu.onrender.com/](https://sanemembedu.onrender.com/)
* **Backend** : [https://flag-explorer-app.onrender.com/](https://flag-explorer-app.onrender.com/)

## Prerequisites

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/) (optional, for multi-container setup)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SaneleMbedu98/flag-explorer-app.git
cd flag-explorer-app
```

### 2. Build and Run with Docker

#### Option 1: Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

This builds and starts both backend and frontend containers with automatic networking.

#### Option 2: Manual Docker Commands

 **Backend** :

```bash
cd backend
docker build -t flag-explorer-backend:latest .
docker run -d -p 5000:5000 --name flag-explorer-backend flag-explorer-backend:latest
```

 **Frontend** :

```bash
cd frontend
docker build -t flag-explorer-frontend:latest .
docker run -d -p 3000:3000 --name flag-explorer-frontend flag-explorer-frontend:latest
```

### 3. Access the Application

* **URL** : [http://localhost:3000](http://localhost:3000/)
* **Ports** :
* Frontend: `3000`
* Backend: `5000` (for API requests)

### 4. Stopping the Application

 **With Docker Compose** :

```bash
docker-compose down
```

 **Manually** :

```bash
docker stop flag-explorer-backend flag-explorer-frontend
docker rm flag-explorer-backend flag-explorer-frontend
```

## Directory Structure

```
flag-explorer-app/
├── .github/workflows/ci.yml        # CI/CD pipeline
├── backend/
│   ├── src/
│   │   ├── controllers/countryController.js  # API logic
│   │   ├── routes/countryRoutes.js           # API routes
│   │   ├── services/countryService.js        # Data fetching
│   │   ├── models/cache.js                   # Caching schema
│   │   └── utils/api.js                     # API helpers
│   ├── tests/                              # Unit & integration tests
│   ├── .env                                # Env variables
│   ├── .dockerignore                       # Docker exclusions
│   ├── Dockerfile                          # Backend container
│   ├── package.json                        # Dependencies
│   ├── server.js                           # Express server
│   └── swagger.yaml                        # API documentation
├── frontend/
│   ├── public/index.html                   # React template
│   ├── src/
│   │   ├── components/
│   │   │   ├── FlagGrid.js                 # Flag grid
│   │   │   ├── FlagCard.js                 # Flag display
│   │   │   └── CountryDetails.js           # Country details
│   │   ├── pages/
│   │   │   ├── Home.js                     # Home page
│   │   │   └── Details.js                  # Detail page
│   │   ├── services/api.js                 # API client
│   │   ├── styles/tailwind.css             # Styles
│   │   ├── App.js                          # Main app
│   │   └── tests/                          # Frontend tests
│   ├── .env                                # Env variables
│   ├── .dockerignore                       # Docker exclusions
│   ├── Dockerfile                          # Frontend container
│   ├── package.json                        # Dependencies
│   └── tailwind.config.js                  # Tailwind config
├── .dockerignore                           # Root exclusions
├── .gitignore                              # Git exclusions
├── docker-compose.yml                      # Multi-container config
├── LICENSE                                 # MIT License
└── README.md                               # Documentation
```

## Troubleshooting

* **Port Conflicts** : Change ports in `docker run` (e.g., `-p 8081:3000`) or `docker-compose.yml`.
* **Docker Issues** : Ensure Docker is running; use `sudo` on Linux if needed.
* **Logs** : Check with `docker logs flag-explorer-backend` or `docker logs flag-explorer-frontend`.

## Contributing

Fork the repo, create a branch, and submit a pull request. Ensure tests pass and follow coding standards.

## License

MIT License. See [LICENSE](https://grok.com/chat/LICENSE).

## Challenges

### CORS Issues

 **Problem** : Browser errors due to missing `Access-Control-Allow-Origin` headers.

 **Solutions** :

* Added CORS middleware in Express:
  ```javascript
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  ```
* Used Docker Compose for networking.
* Added proxy in frontend `package.json`:
  ```json
  "proxy": "http://localhost:5000"
  ```

 **Lessons** :

* Define origins for security.
* Test CORS early.
* Use Docker networking for local dev.

### Backend Testing Problems

 **Issues** :

* REST Countries API latency/rate limits caused test inconsistencies.
* Async test failures.
* Inconsistent `.env` settings.

 **Solutions** :

* Mocked API with Nock:
  ```javascript
  nock('https://restcountries.com').get('/v3.1/all').reply(200, [{ name: { common: 'Test' }, flags: { png: 'flag.png' } }]);
  ```
* Used `async/await` in Supertest:
  ```javascript
  it('returns countries', async () => {
    const res = await request(app).get('/countries');
    expect(res.status).toBe(200);
  });
  ```
* Used `.env.test` for test settings.

 **Lessons** :

* Mock external APIs.
* Mirror production in test environments.

### Other Challenges

* **API Rate Limits** : Cached responses with Redis/in-memory storage.
* **Docker Image Size** : Used multi-stage builds.
* **Performance** : Added lazy loading for flag images.

Both services are live on Render:

* **Frontend** : [https://sanemembedu.onrender.com/](https://sanemembedu.onrender.com/)
* **Backend** : [https://flag-explorer-app.onrender.com/](https://flag-explorer-app.onrender.com/)
