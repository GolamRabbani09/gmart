# G-Mart - Full-Stack E-Commerce Platform 🛒

G-Mart is a modern, responsive, full-stack web application for an online grocery shopping platform. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), featuring Tailwind CSS for styling and Zustand for state management.

---

## 🌟 Features

### 🖥️ Frontend (React + Vite)
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Dynamic UI**: Beautiful landing page, category browsing, and product filtering.
- **State Management**: Client-side state managed via Zustand (Cart, Auth).
- **Authentication**: JWT-based user login and registration.
- **Shopping Cart**: Add, remove, update quantities, with automatic total calculation.
- **API Integration**: Axios with interceptors for seamless communication and token injection.

### ⚙️ Backend (Node.js + Express)
- **RESTful API**: Endpoints for Users, Products, Orders, and Auth.
- **Database**: MongoDB with Mongoose ODM.
- **Security**: 
  - Password hashing with `bcryptjs`.
  - JWT Authentication middleware.
  - Security headers using `helmet`.
  - Rate limiting with `express-rate-limit`.
- **Validation**: Strict input validation using `express-validator`.
- **Error Handling**: Centralized error handling middleware.

---

## 📁 Project Structure

```text
gmart/
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers (auth, products, orders, users)
│   │   ├── middleware/       # Custom middleware (auth, error handler)
│   │   ├── models/           # Mongoose schemas (User, Product, Order)
│   │   ├── routes/           # Express routes
│   │   ├── utils/            # Helper functions (e.g., generateToken)
│   │   └── server.js         # Entry point for the backend
│   ├── .env.example          # Backend environment variables template
│   └── package.json          # Backend dependencies and scripts
│
└── frontend/                 # React + Vite frontend
    ├── src/
    │   ├── components/       # Reusable UI components (Navbar, Footer, ProductCard)
    │   ├── pages/            # Page components (Home, Products, Cart, Auth)
    │   ├── services/         # API service layer (Axios)
    │   ├── store/            # Zustand state stores (cartStore, authStore)
    │   ├── App.jsx           # Main React component and Router
    │   ├── index.css         # Global styles and Tailwind directives
    │   └── main.jsx          # React entry point
    ├── vite.config.js        # Vite configuration (proxy setup)
    └── package.json          # Frontend dependencies and scripts
```

---

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Clone the repository
Ensure you are in the project root directory (`gmart/`).

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```
   *Make sure your MongoDB instance is running and update `MONGO_URI` if necessary.*
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🧪 API Documentation / Testing

You can use **Postman** to test the API endpoints.

**Base URL**: `http://localhost:5000/api`

### Auth Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current logged-in user profile

### Product Routes
- `GET /products` - Get all products (supports query params: `keyword`, `category`, `page`)
- `GET /products/:id` - Get a single product
- `GET /products/categories` - Get distinct categories
- `POST /products/:id/reviews` - Add a review to a product

### Order Routes
- `POST /orders` - Create a new order
- `GET /orders/my-orders` - Get current user's orders

*(Admin-specific routes like updating products, getting all users, etc., require an admin JWT token).*

---

## 🚀 Deployment Guide

### Frontend Deployment (Vercel/Netlify)
1. Push your code to GitHub.
2. Link your repository to Vercel or Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. **Important**: Add an environment variable (or Vite configuration) to point API requests to your deployed backend URL.

### Backend Deployment (Render/Railway)
1. Link your repository to Render or Railway.
2. Root Directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Set the required Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, etc.).

---

Developed with ❤️ using the MERN stack.
