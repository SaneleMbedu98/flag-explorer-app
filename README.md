
# Flag Explorer App

Welcome to the  **Flag Explorer App** , a web application that allows users to explore and learn about flags from different countries. This project is built with a Node.js backend and a frontend, containerized using Docker for easy deployment.

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
docker run -d -p 8080:8080 --name flag-explorer-frontend flag-explorer-frontend:latest
```

### 3. Access the Application

Once the containers are running, you can access the Flag Explorer App at the following URL:

* **URL** : `http://localhost:8080`
* **Ports** :
* Frontend: `8080` (mapped to the container's port 8080)
* Backend: `3000` (mapped to the container's port 3000, used for API requests)

Open your browser and navigate to `http://localhost:8080` to start exploring flags!

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

## Troubleshooting

* **Port Conflicts** : If ports `3000` or `8080` are already in use, modify the host port in the `docker run` command (e.g., `-p 8081:8080`) or in `docker-compose.yml`.
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
