# 🔒 Secure Todo App

A production-ready, full-stack secure To-Do List application demonstrating modern web development, security best practices, and DevOps workflows.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌───────────────┐
│   React Client  │────▶│  Express API     │────▶│  PostgreSQL   │
│   (Vite + TS)   │     │  (Node.js + TS)  │     │  (Neon / DB)  │
│   Tailwind CSS  │◀────│  JWT + bcrypt     │◀────│  Knex.js      │
│   Bootstrap 5   │     │  Helmet + CORS   │     │               │
└─────────────────┘     └──────────────────┘     └───────────────┘
```

### Tech Stack

| Layer      | Technology                                        |
|------------|---------------------------------------------------|
| Frontend   | React 18, TypeScript, Tailwind CSS, Bootstrap 5   |
| Backend    | Node.js, Express.js, TypeScript                   |
| Database   | PostgreSQL (Neon serverless)                       |
| ORM        | Knex.js (query builder)                            |
| Auth       | JWT + bcrypt                                       |
| Security   | Helmet, CORS, rate-limit, Zod validation           |
| Testing    | Jest, Supertest                                    |
| DevOps     | Docker, docker-compose, GitHub Actions             |

---

## ✨ Features

- **Authentication** — Register & login with email/password, JWT-protected routes
- **CRUD Todos** — Create, read, update, delete, toggle complete
- **Search & Filter** — Search by title/description, filter by status
- **Pagination** — Server-side pagination
- **Authorization** — Users can only access their own todos
- **Security** — bcrypt hashing, Helmet headers, rate limiting, input validation, CORS
- **Responsive UI** — Dark-themed modern interface with micro-animations
- **Error Handling** — Error boundaries, toast notifications, centralized error middleware
- **Docker** — Full containerization with docker-compose
- **CI/CD** — GitHub Actions pipeline for testing and building

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (local or [Neon](https://neon.tech))
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/your-username/secure-todo-app.git
cd secure-todo-app

# Install all dependencies
npm run install:all
```

### 2. Environment Setup

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your database URL and JWT secret
```

**Required variables:**

| Variable       | Description                    | Example                                        |
|----------------|--------------------------------|------------------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string   | `postgresql://user:pass@localhost:5432/todoapp` |
| `JWT_SECRET`   | Secret key for JWT signing     | `my-super-secret-key`                          |
| `PORT`         | Server port                    | `5000`                                         |
| `CORS_ORIGIN`  | Frontend URL                   | `http://localhost:5173`                        |

### 3. Database Setup

```bash
# Run migrations
npm run migrate

# (Optional) Seed demo data
npm run seed
```

### 4. Run Development

```bash
# Start both client and server
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Health check:** http://localhost:5000/api/health

### 5. Run with Docker

```bash
docker-compose up --build
```

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 📡 API Endpoints

See [docs/API.md](docs/API.md) for detailed documentation.

| Method   | Endpoint                  | Auth | Description          |
|----------|---------------------------|------|----------------------|
| `POST`   | `/api/auth/register`      | ❌   | Register new user    |
| `POST`   | `/api/auth/login`         | ❌   | Login                |
| `GET`    | `/api/auth/me`            | ✅   | Get current user     |
| `GET`    | `/api/todos`              | ✅   | Get all todos        |
| `POST`   | `/api/todos`              | ✅   | Create todo          |
| `PUT`    | `/api/todos/:id`          | ✅   | Update todo          |
| `DELETE` | `/api/todos/:id`          | ✅   | Delete todo          |
| `PATCH`  | `/api/todos/:id/complete` | ✅   | Toggle complete      |

---

## 🧪 Testing

```bash
# Run all tests
npm test
```

Tests cover:
- Authentication endpoints (register, login, getMe)
- Todo CRUD endpoints
- Authorization (cross-user access prevention)
- Middleware behavior (auth, validation)

---

## 📦 Deployment

### Backend
Deploy to **Render**, **Railway**, or **Fly.io**:
1. Set environment variables
2. Build command: `cd server && npm run build`
3. Start command: `cd server && npm start`

### Frontend
Deploy to **Vercel** or **Netlify**:
1. Build command: `cd client && npm run build`
2. Output directory: `client/dist`
3. Set `VITE_API_URL` to your backend URL

### Database
Use **Neon PostgreSQL** — update `DATABASE_URL` in production env.

---

## 📁 Project Structure

```
secure-todo-app/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── context/        # Auth context
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page components
│       ├── services/       # API service layer
│       └── types/          # TypeScript interfaces
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # Environment config
│   │   ├── controllers/    # Route handlers
│   │   ├── db/             # Knex config & connection
│   │   ├── middleware/     # Auth, validation, error, logging
│   │   ├── models/         # TypeScript interfaces
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities (ApiError)
│   └── tests/              # Jest + Supertest tests
├── database/
│   ├── migrations/         # Knex migrations
│   └── seeds/              # Seed data
├── docker/                 # Dockerfiles + nginx config
├── .github/workflows/      # CI/CD pipeline
└── docs/                   # API documentation
```

---

## 📄 License

MIT
