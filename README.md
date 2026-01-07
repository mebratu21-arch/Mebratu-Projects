# Mebratu E-commerce Project

A full-stack e-commerce application built with modern web technologies, featuring a responsive frontend, a robust backend API, and secure payment processing.

## 🚀 Features

-   **User Authentication**: Secure Login and Registration functionality using JWT.
-   **Product Catalog**: Browse products with details, categories, and deals.
-   **Shopping Cart**: Add, remove, and manage items in your cart.
-   **Checkout System**: Integrated Stripe payment gateway for secure transactions.
-   **Responsive Design**: Built with Tailwind CSS for a seamless mobile and desktop experience.
-   **Database**: PostgreSQL driven backend using Knex.js for query building and migrations.

## 🛠 Tech Stack

### Frontend
-   **React**: UI Library
-   **Vite**: Build tool
-   **Tailwind CSS**: Utility-first CSS framework
-   **React Router**: Navigation
-   **Axios**: HTTP Client
-   **Framer Motion**: Animations

### Backend
-   **Node.js & Express**: Server-side framework
-   **PostgreSQL**: Relational Database
-   **Knex.js**: SQL Query Builder
-   **Stripe API**: Payment Processing
-   **JWT**: Authentication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [PostgreSQL](https://www.postgresql.org/) (or use a cloud provider like Neon)
-   [Git](https://git-scm.com/)

## ⚙️ Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mebratu21-arch/Mebratu-Projects.git
    cd Mebratu-Projects
    ```

2.  **Install Root/Backend Dependencies**
    ```bash
    npm install
    ```

3.  **Install Client Dependencies**
    ```bash
    cd client
    npm install
    cd ..
    ```

4.  **Environment Configuration**
    Create a `.env` file in the root directory and configure your variables:
    ```env
    PORT=5000
    DATABASE_URL=your_postgres_connection_string
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

5.  **Database Setup**
    Run migrations and seeds to set up the database schema and initial data.
    ```bash
    npx knex migrate:latest
    npx knex seed:run
    ```

## 🏃‍♂️ Running the Project

1.  **Start the Backend Server**
    From the root directory:
    ```bash
    npm start
    # or for development
    npm run dev
    ```

2.  **Start the Frontend Development Server**
    In a new terminal window, navigate to the client folder and start Vite:
    ```bash
    cd client
    npm run dev
    ```

    The frontend will typically run on `http://localhost:5173`, and the backend on `http://localhost:5000`.

## 📂 Project Structure

```
Mebratu-Projects/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Cart, Login, etc.)
│   │   ├── context/        # React Context (Auth, Cart)
│   │   └── ...
│   └── ...
├── config/                 # Database configuration
├── middleware/             # Express middleware (Auth)
├── migrations/             # Database migrations
├── routes/                 # API Routes (Auth, Products, Cart, Checkout)
├── seeds/                  # Database seed data
├── server.js               # Entry point for Backend
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
