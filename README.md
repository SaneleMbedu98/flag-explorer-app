# Flag Explorer App

A full-stack application to explore country flags and details, built with Node.js (Express) for the backend and React for the frontend.

## Prerequisites
- Node.js (>=18.x)
- npm (>=9.x)

## Setup

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The backend runs on `http://localhost:3000`.

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend runs on `http://localhost:3001`.

## Running Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## CI/CD Pipeline
The project includes a GitHub Actions pipeline (`.github/workflows/ci-cd.yml`) that:
- Runs backend and frontend tests.
- Builds both applications.

## Deployment
- **Backend**: Deploy to a platform like Heroku or AWS.
- **Frontend**: Deploy static assets to Netlify or Vercel.

## API Endpoints
- `GET /countries`: Retrieve all countries.
- `GET /countries/:name`: Retrieve details for a specific country.

## Technologies
- **Backend**: Node.js, Express, Axios
- **Frontend**: React, React Router, Tailwind CSS
- **Testing**: Jest, Supertest, React Testing Library
- **CI/CD**: GitHub Actions
