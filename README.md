# GatePulse

> A production-grade API Gateway dashboard for secure API management, traffic analytics, rate limiting, and request monitoring.

<p align="center">
  <img src="README-assets/demo.gif" alt="GatePulse application demo" width="100%">
</p>

<p align="center">
  <a href="https://gate-pulse.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel" alt="GatePulse live demo">
  </a>
  <a href="https://github.com/harshdeepsingh888-ps/GatePulse">
    <img src="https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github" alt="GatePulse source code">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-production-success" alt="Production status">
  <img src="https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/license-MIT-lightgrey" alt="MIT License">
</p>

---

## Overview

GatePulse is a full-stack API Gateway platform built to demonstrate production-oriented backend and frontend engineering practices.

It provides secure administrator authentication, API key lifecycle management, token bucket rate limiting, request logging, and traffic analytics through a modern React and TypeScript dashboard.

The project is deployed across Vercel, Render, and Neon and includes a Dockerized backend for consistent local and production environments.

---

## Key Highlights

- Secure JWT-based administrator authentication
- API key creation, regeneration, listing, and revocation
- SHA-256 API key hashing with safe key-prefix storage
- Token bucket rate limiting with configurable request limits
- Gateway middleware for API key validation and request processing
- Request and response logging
- Analytics for traffic, latency, errors, and API key usage
- Responsive React and TypeScript dashboard
- PostgreSQL persistence with Prisma ORM
- Dockerized Express.js backend
- Production deployment using Vercel, Render, and Neon

---

## Live Demo

| Service | Deployment |
|---|---|
| Frontend | [GatePulse Dashboard](https://gate-pulse.vercel.app) |
|| Backend API | [Render API](https://gatepulse-backend.onrender.com) |
| Database | Neon PostgreSQL |

> The backend may take a few seconds to respond after a period of inactivity because of hosting cold starts.

---

## Features

### Authentication

- Administrator login using JWT authentication
- Protected backend routes
- Persistent frontend authentication state
- Automatic handling of unauthorized sessions

### API Key Management

- Generate secure API keys
- Store only SHA-256 hashes
- Display safe key prefixes
- Configure usage tiers and request limits
- Regenerate compromised keys
- Revoke active keys
- Track creation, expiration, and last-used timestamps

### Gateway and Rate Limiting

- Validate incoming API keys
- Reject inactive, invalid, or expired keys
- Apply configurable token bucket rate limiting
- Return structured gateway responses
- Track request outcomes and response times

### Analytics and Monitoring

- Overview metrics
- Traffic and usage trends
- Recent request activity
- Top API keys
- Error distribution
- Latency analytics
- Gateway health indicators

### Production Engineering

- Environment-based configuration
- Request validation with Zod
- Structured logging with Pino
- Centralized error handling
- Prisma database migrations
- Dockerized backend
- Separate frontend and backend deployments

---

## Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and gateway server |
| Prisma ORM | Type-safe database access |
| PostgreSQL | Relational data persistence |
| Neon | Managed PostgreSQL hosting |
| JWT | Administrator authentication |
| Zod | Request validation |
| Pino | Structured application logging |
| Docker | Backend containerization |

### Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Static type safety |
| Vite | Frontend build tooling |
| Tailwind CSS | Interface styling |
| TanStack Query | Server-state management |
| Axios | HTTP communication |
| Recharts | Analytics visualizations |
| Lucide React | Interface icons |
| React Router | Client-side routing |

### Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon |
| Containerization | Docker |

---

## Architecture

GatePulse follows a layered full-stack architecture separating the client dashboard, API Gateway, domain services, middleware, analytics, and persistence layers.

<p align="center">
  <img src="README-assets/Architecture.png" alt="GatePulse system architecture" width="100%">
</p>

### Request Flow

```text
Client Application
        │
        ▼
React + TypeScript Dashboard
        │
        ▼
Express.js API Gateway
        │
        ├── JWT Authentication
        ├── API Key Service
        ├── Analytics Engine
        ├── Request Logging
        └── Token Bucket Rate Limiting
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

---

## Screenshots

### Dashboard

<p align="center">
  <img src="README-assets/Dashboard.png" alt="GatePulse dashboard" width="100%">
</p>

### API Key Management

<p align="center">
  <img src="README-assets/API-keys.png" alt="GatePulse API key management" width="100%">
</p>

### Analytics

<p align="center">
  <img src="README-assets/Analytics.png" alt="GatePulse analytics dashboard" width="100%">
</p>

### Login

<p align="center">
  <img src="README-assets/Login-page.png" alt="GatePulse login page" width="100%">
</p>

---

## Project Structure

```text
GatePulse/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── scripts/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── .dockerignore
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── routes/
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── README-assets/
│   ├── Analytics.png
│   ├── API-keys.png
│   ├── Architecture.png
│   ├── Dashboard.png
│   ├── Login-page.png
│   └── demo.gif
│
└── README.md
```

> The displayed structure highlights the main architectural directories. Minor utility and configuration files may not be shown.

---

## Getting Started

### Prerequisites

Install the following before running GatePulse locally:

- Node.js 24 or later
- npm
- PostgreSQL database
- Git
- Docker, optional

### 1. Clone the repository

```bash
git clone https://github.com/harshdeepsingh888-ps/GatePulse.git
cd GatePulse
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
JWT_SECRET="replace_with_a_secure_random_secret"
PORT=5000
NODE_ENV="development"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Run the administrator seed script configured by the project:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The backend should be available at:

```text
http://localhost:5000
```

### 3. Configure the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend`:

```env
VITE_API_BASE_URL="http://localhost:5000/api"
```

Start the frontend:

```bash
npm run dev
```

The frontend should be available at the local URL displayed by Vite.

---

## Docker

Build the backend image from the `backend` directory:

```bash
docker build -t gatepulse-backend:local .
```

Run the container:

```bash
docker run --env-file .env -p 5000:5000 gatepulse-backend:local
```

The backend will be available at:

```text
http://localhost:5000
```

---

## Environment Variables

### Backend

| Variable | Required | Description |
|---|---:|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret used to sign administrator tokens |
| `PORT` | No | Backend server port; defaults to `5000` |
| `NODE_ENV` | No | Runtime environment |

### Frontend

| Variable | Required | Description |
|---|---:|---|
| `VITE_API_BASE_URL` | Yes | Base URL of the deployed or local backend API |

Never commit real secrets or production credentials to version control.

---

## Available Analytics

GatePulse exposes analytics for:

```text
GET /api/analytics/overview
GET /api/analytics/top-api-keys
GET /api/analytics/recent-requests
GET /api/analytics/usage-trend
GET /api/analytics/errors
GET /api/analytics/latency
```

These endpoints power the metrics, tables, and charts displayed throughout the dashboard.

---

## API Key Lifecycle

```text
Generate API Key
       │
       ▼
Return Raw Key Once
       │
       ▼
Store SHA-256 Hash and Safe Prefix
       │
       ▼
Authenticate Gateway Requests
       │
       ├── Regenerate
       └── Revoke
```

Raw API keys are returned only when they are generated or regenerated. GatePulse stores the hash rather than the original secret.

---

## Security Considerations

- Password-protected administrator access
- JWT-based protected routes
- Hashed API key storage
- API key expiration and revocation support
- Request payload validation
- Centralized error responses
- Security headers through Helmet
- Environment-based secret management
- Configurable rate limiting
- No production credentials committed to the repository

---

## Production Deployment

### Frontend

The React application is built with Vite and deployed on Vercel.

### Backend

The Express.js API is deployed on Render and can also be run using Docker.

### Database

Application data, API keys, administrators, and request logs are stored in a managed Neon PostgreSQL database.

---

## Roadmap

- [x] Administrator authentication
- [x] API key lifecycle management
- [x] Gateway middleware
- [x] Token bucket rate limiting
- [x] Request logging
- [x] Analytics engine
- [x] React and TypeScript dashboard
- [x] Dockerized backend
- [x] Production deployment
- [x] Architecture diagram
- [x] Product screenshots
- [x] Demo recording
- [ ] Additional automated test coverage
- [ ] Multi-administrator role management
- [ ] Configurable gateway route targets

---

## Lessons Demonstrated

GatePulse demonstrates practical experience with:

- Designing modular Express.js services
- Building authentication and authorization flows
- Managing secure API credentials
- Implementing middleware-driven request pipelines
- Applying rate-limiting algorithms
- Modelling relational data with Prisma
- Building analytical REST APIs
- Managing client-side server state with TanStack Query
- Visualizing backend metrics with Recharts
- Containerizing and deploying a full-stack application

---

## Author

**Harshdeep Singh**

- GitHub: [harshdeepsingh888-ps](https://github.com/harshdeepsingh888-ps)
- LinkedIn: [Harshdeep Singh](https://www.linkedin.com/in/harshdeep-singh-073b02320/)

---

## License

This project is intended to be released under the MIT License.

---

<p align="center">
  Built with React, TypeScript, Express.js, Prisma, PostgreSQL, and Docker.
</p>