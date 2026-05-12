# E-Commerce Platform - ALMOTTHEDON

Full-stack e-commerce application built with **Vue 3** (frontend) and **Node.js + Express + SQLite** (backend).

## Project Structure

```
├─ backend/          # Express API server
│  ├─ controllers/   # Route handlers
│  ├─ middleware/     # JWT auth middleware
│  ├─ routes/        # API route definitions
│  ├─ database.js    # SQLite setup
│  ├─ seed.js        # Database seeder
│  ├─ server.js      # Entry point
│  └─ .env           # Environment variables
├─ src/              # Vue 3 frontend
│  ├─ views/         # Page components
│  ├─ components/    # Reusable components
│  ├─ router/        # Vue Router setup
│  ├─ store/         # Vuex state management
│  └─ utils/         # API helper
├─ public/           # Static assets
└─ package.json      # Frontend dependencies
```

## Features

- User registration & login (JWT authentication)
- Product listing with categories (Electronics, Jewelry, Men/Women Clothing)
- Product detail page with quantity selector
- Shopping cart (add, remove, update quantities)
- Checkout with address & payment method
- Order history
- Admin dashboard (CRUD products)
- Toast notifications
- Responsive design (mobile-friendly)

## Prerequisites

- Node.js >= 18
- npm

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
npm run seed     # Populate database with products & admin user
npm start        # Starts on http://localhost:5000
```

### 2. Frontend

```bash
# From project root
npm install
npm run serve    # Starts on http://localhost:8080
```

### 3. Open in Browser

Visit **http://localhost:8080**

## Default Admin Account

| Email             | Password  |
|-------------------|-----------|
| admin@example.com | admin123  |

## Environment Variables

Backend (`backend/.env`):

| Variable     | Default                        | Description          |
|-------------|--------------------------------|----------------------|
| PORT        | 5000                           | API server port      |
| JWT_SECRET  | your_jwt_secret_key_change...  | JWT signing key      |
| DB_PATH     | ./database.sqlite              | SQLite file path     |

Frontend (`VUE_APP_API_URL`): defaults to `http://localhost:5000/api`

## API Endpoints

### Products
```bash
# Get all products
GET /api/products

# Get products by category
GET /api/products?category=electronics

# Get single product
GET /api/products/:id

# Create product (admin)
POST /api/products
Authorization: Bearer <token>
Body: { "title": "...", "price": 99, "description": "...", "category": "...", "image": "..." }

# Update product (admin)
PUT /api/products/:id
Authorization: Bearer <token>

# Delete product (admin)
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Users
```bash
# Register
POST /api/users/register
Body: { "name": "...", "email": "...", "password": "..." }

# Login
POST /api/users/login
Body: { "email": "...", "password": "..." }
Response: { "user": {...}, "token": "..." }

# Get profile
GET /api/users/profile
Authorization: Bearer <token>
```

### Cart (requires auth)
```bash
# Get cart
GET /api/cart
Authorization: Bearer <token>

# Add to cart
POST /api/cart
Authorization: Bearer <token>
Body: { "product_id": 1, "quantity": 2 }

# Remove from cart
DELETE /api/cart/:itemId
Authorization: Bearer <token>
```

### Orders (requires auth)
```bash
# Create order
POST /api/orders
Authorization: Bearer <token>
Body: { "address": "...", "payment_method": "credit_card" }

# Get my orders
GET /api/orders
Authorization: Bearer <token>
```

## cURL Examples

```bash
# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get products
curl http://localhost:5000/api/products

# Add to cart (replace TOKEN)
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"product_id":1,"quantity":1}'

# Create order (replace TOKEN)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"address":"123 Main St","payment_method":"credit_card"}'
```

## Tech Stack

- **Frontend:** Vue 3, Vue Router, Vuex, Bootstrap 5, Font Awesome
- **Backend:** Node.js, Express, better-sqlite3, JWT, bcryptjs
- **Database:** SQLite
