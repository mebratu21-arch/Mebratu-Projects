<div align="center">

# MEBRATU SHOP

<img src="https://img.shields.io/badge/STATUS-PRODUCTION_READY-00D4AA?style=for-the-badge&labelColor=0D1117" alt="Status"/>

### Enterprise E-Commerce Platform | 2026

[![React](https://img.shields.io/badge/React-19.0-00D8FF?style=flat-square&logo=react&logoColor=white&labelColor=0D1117)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=nodedotjs&logoColor=white&labelColor=0D1117)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white&labelColor=0D1117)](https://postgresql.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0D1117)](https://tailwindcss.com)
[![Stripe](https://img.shields.io/badge/Stripe-API-635BFF?style=flat-square&logo=stripe&logoColor=white&labelColor=0D1117)](https://stripe.com)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=0D1117)](https://vitejs.dev)
[![JWT](https://img.shields.io/badge/JWT-Auth-F80061?style=flat-square&logo=jsonwebtokens&logoColor=white&labelColor=0D1117)](https://jwt.io)
[![Express](https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express&logoColor=white&labelColor=0D1117)](https://expressjs.com)

---

**Full-Stack E-Commerce** | **Secure Payments** | **Production-Grade Architecture**

[Features](#-features) | [Tech Stack](#-technology-architecture) | [Quick Start](#-quick-start) | [API](#-api-endpoints) | [Connect](#-connect)

</div>

---

## Overview

A modern, full-stack e-commerce platform built with cutting-edge technologies. Designed with scalability, security, and user experience at its core — aligned with Israeli high-tech industry standards.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│    ┌──────────────┐      ┌──────────────┐      ┌──────────────┐                 │
│    │   CLIENT     │      │   SERVER     │      │   DATABASE   │                 │
│    │              │      │              │      │              │                 │
│    │  React       │ ───► │  Express     │ ───► │  PostgreSQL  │                 │
│    │  Vite        │ ◄─── │  JWT Auth    │ ◄─── │  Knex.js     │                 │
│    │  Tailwind    │      │  Stripe API  │      │  Migrations  │                 │
│    │  Framer      │      │  REST APIs   │      │  Seeds       │                 │
│    └──────────────┘      └──────────────┘      └──────────────┘                 │
│           │                     │                                                │
│           │              ┌──────────────┐                                       │
│           └─────────────►│   STRIPE     │                                       │
│                          │   PAYMENTS   │                                       │
│                          └──────────────┘                                       │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Features

### Customer Experience

| Feature | Description |
|---------|-------------|
| **User Authentication** | Secure JWT-based registration and login system |
| **Product Catalog** | Browse products with categories and filtering |
| **Shopping Cart** | Add, remove, and update quantities in real-time |
| **Secure Checkout** | Stripe-integrated payment processing |
| **Responsive Design** | Optimized for all devices and screen sizes |
| **Smooth Animations** | Framer Motion powered micro-interactions |

### Technical Features

| Feature | Implementation |
|---------|----------------|
| **RESTful API** | Express.js with structured routing |
| **Database ORM** | Knex.js query builder with migrations |
| **Payment Processing** | Stripe API integration |
| **State Management** | React hooks and context |
| **Form Validation** | Client and server-side validation |
| **Error Handling** | Global error boundaries and API error responses |

---

## Technology Architecture

### Frontend Stack

```
┌─────────────────────────────────────────────────┐
│                   CLIENT                         │
├─────────────────────────────────────────────────┤
│  Framework      │  React 19                     │
│  Build Tool     │  Vite 6.0                     │
│  Styling        │  Tailwind CSS 3.4             │
│  Routing        │  React Router 6               │
│  HTTP Client    │  Axios                        │
│  Animations     │  Framer Motion                │
│  Icons          │  Lucide React                 │
└─────────────────────────────────────────────────┘
```

### Backend Stack

```
┌─────────────────────────────────────────────────┐
│                   SERVER                         │
├─────────────────────────────────────────────────┤
│  Runtime        │  Node.js 22                   │
│  Framework      │  Express 5.0                  │
│  Database       │  PostgreSQL 16                │
│  Query Builder  │  Knex.js                      │
│  Authentication │  JWT (jsonwebtoken)           │
│  Payments       │  Stripe API                   │
│  Security       │  bcrypt, helmet, cors         │
└─────────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

```bash
node --version    # v22.x or higher
npm --version     # v10.x or higher
psql --version    # PostgreSQL 16+
```

### Environment Variables

Create `.env` files in both client and server directories:

**Server `.env`**
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mebratu_shop
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

**Client `.env`**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
```

### Installation

```bash
# Clone repository
git clone https://github.com/mebratu21-arch/Mebratu-Projects.git
cd Mebratu-Projects/Mebratu\ Shop

# Install server dependencies
cd server
npm install

# Run database migrations
npx knex migrate:latest

# Seed database (optional)
npx knex seed:run

# Start server
npm run dev
```

```bash
# In a new terminal - Install client dependencies
cd client
npm install

# Start client
npm run dev
```

### Access Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| API Documentation | http://localhost:5000/api |

---

## Project Structure

```
Mebratu Shop/
├── client/                      # Frontend React application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/          # Buttons, Inputs, Cards
│   │   │   ├── layout/          # Header, Footer, Sidebar
│   │   │   └── features/        # Feature-specific components
│   │   ├── pages/               # Route pages
│   │   │   ├── Home/
│   │   │   ├── Products/
│   │   │   ├── Cart/
│   │   │   ├── Checkout/
│   │   │   └── Auth/
│   │   ├── hooks/               # Custom React hooks
│   │   ├── context/             # React context providers
│   │   ├── services/            # API service layer
│   │   ├── utils/               # Helper functions
│   │   ├── styles/              # Global styles
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
├── server/                      # Backend Express application
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API route definitions
│   │   ├── middleware/          # Auth, validation, error handling
│   │   ├── models/              # Database models
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Helper utilities
│   │   └── config/              # Configuration files
│   ├── db/
│   │   ├── migrations/          # Knex migrations
│   │   └── seeds/               # Seed data
│   ├── knexfile.js              # Knex configuration
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/logout` | User logout |
| `GET` | `/api/auth/me` | Get current user |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get single product |
| `GET` | `/api/products/category/:name` | Get products by category |
| `POST` | `/api/products` | Create product (Admin) |
| `PUT` | `/api/products/:id` | Update product (Admin) |
| `DELETE` | `/api/products/:id` | Delete product (Admin) |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get user cart |
| `POST` | `/api/cart/add` | Add item to cart |
| `PUT` | `/api/cart/update` | Update cart item |
| `DELETE` | `/api/cart/remove/:id` | Remove cart item |

### Orders & Checkout

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/checkout/create-session` | Create Stripe session |
| `POST` | `/api/checkout/webhook` | Stripe webhook handler |
| `GET` | `/api/orders` | Get user orders |
| `GET` | `/api/orders/:id` | Get order details |

---

## Database Schema

```sql
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     USERS       │       │    PRODUCTS     │       │   CATEGORIES    │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │       │ id              │
│ email           │       │ name            │       │ name            │
│ password_hash   │       │ description     │       │ slug            │
│ name            │       │ price           │       │ created_at      │
│ role            │       │ image_url       │       └─────────────────┘
│ created_at      │       │ category_id     │───────────────┘
└─────────────────┘       │ stock           │
        │                 │ created_at      │
        │                 └─────────────────┘
        │                         │
        ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│     ORDERS      │       │   ORDER_ITEMS   │
├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │
│ user_id         │───┐   │ order_id        │───┐
│ total           │   │   │ product_id      │───┘
│ status          │   │   │ quantity        │
│ stripe_id       │   │   │ price           │
│ created_at      │   │   └─────────────────┘
└─────────────────┘   │
        ▲             │
        └─────────────┘

┌─────────────────┐
│   CART_ITEMS    │
├─────────────────┤
│ id              │
│ user_id         │
│ product_id      │
│ quantity        │
│ created_at      │
└─────────────────┘
```

---

## Security Measures

| Layer | Implementation |
|-------|----------------|
| **Authentication** | JWT tokens with secure httpOnly cookies |
| **Password Security** | bcrypt hashing with salt rounds |
| **API Protection** | Rate limiting, CORS configuration |
| **Input Validation** | Server-side validation on all endpoints |
| **SQL Injection** | Parameterized queries via Knex.js |
| **XSS Prevention** | Content Security Policy headers |
| **Payment Security** | Stripe PCI-compliant integration |

---

## Scripts

### Server

```bash
npm run dev        # Start development server with nodemon
npm run start      # Start production server
npm run migrate    # Run database migrations
npm run seed       # Seed database with sample data
npm run rollback   # Rollback last migration
```

### Client

```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Deployment

### Production Build

```bash
# Build client
cd client && npm run build

# The dist folder can be served via nginx or CDN

# Start server in production
cd server && NODE_ENV=production npm start
```

### Environment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production database URL
- [ ] Set secure JWT secret (256-bit minimum)
- [ ] Configure Stripe live keys
- [ ] Enable HTTPS
- [ ] Set up reverse proxy (nginx)
- [ ] Configure CORS for production domain

---

## Connect

<div align="center">

### Mebratu Mengstu

**Full-Stack Developer**

[![GitHub](https://img.shields.io/badge/GitHub-mebratu21--arch-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mebratu21-arch)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mebratu)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00D4AA?style=for-the-badge&logo=safari&logoColor=white)](https://mebratu21-arch.github.io)

---

<sub>Built with precision and passion | 2026</sub>

<sub>**Created by Mebratu Mengstu**</sub>

</div>
