# E-Commerce Platform - ALMOTTHEDON

Full-stack e-commerce application built with **Vue 3** (frontend) and **Node.js + Express** (backend).

- **Local development:** SQLite via `better-sqlite3`
- **Vercel deployment:** PostgreSQL via `@neondatabase/serverless`

## Project Structure

```
├─ api/              # Vercel serverless function entry
│  ├─ index.js       # Serverless handler (imports backend/server.js)
│  └─ package.json   # Production deps for Vercel
├─ backend/          # Express API server
│  ├─ controllers/   # Route handlers
│  ├─ middleware/     # JWT auth middleware
│  ├─ routes/        # API route definitions
│  ├─ database.js    # Database abstraction (SQLite local / Neon on Vercel)
│  ├─ schema.js      # PostgreSQL-compatible table creation
│  ├─ seed.js        # Database seeder
│  ├─ server.js      # Entry point (exports app, auto-creates tables + seeds)
│  ├─ package.json   # Dev + production deps
│  └─ .env           # Environment variables
├─ src/              # Vue 3 frontend
│  ├─ views/         # Page components
│  ├─ components/    # Reusable components
│  ├─ router/        # Vue Router setup
│  ├─ store/         # Vuex state management
│  └─ utils/         # API helper
├─ public/           # Static assets
├─ vercel.json       # Vercel deployment config
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

## Local Development

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
npm run serve    # Starts on http://localhost:3000 (proxies /api to :5000)
```

### 3. Open in Browser

Visit **http://localhost:3000**

## Deploy to Vercel

### Prerequisites

1. [Vercel account](https://vercel.com)
2. [Neon PostgreSQL database](https://neon.tech) (free tier: 256 MB)

### Steps

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import project in Vercel Dashboard**

   - Click "Add New → Project"
   - Import your GitHub repository
   - Framework preset: **Vue.js** (detected automatically)
   - Root directory: `./` (default)

3. **Set environment variables**

   In Vercel Dashboard → Project Settings → Environment Variables:

   | Name           | Value                                      |
   |----------------|--------------------------------------------|
   | `JWT_SECRET`   | (your secret key)                          |
   | `DATABASE_URL` | (your Neon PostgreSQL connection string)   |

4. **Deploy**

   Click "Deploy". Vercel will:
   - Build the Vue frontend (`npm run build`)
   - Deploy the serverless function at `api/index.js`
   - Auto-create tables & seed data on first request

5. **Visit your site**

   Your app will be available at `https://<your-project>.vercel.app`

## Default Admin Account

| Email             | Password  |
|-------------------|-----------|
| admin@example.com | admin123  |

## Environment Variables

### Local – Backend (`backend/.env`)

| Variable     | Default                        | Description          |
|-------------|--------------------------------|----------------------|
| PORT        | 5000                           | API server port      |
| JWT_SECRET  | your_jwt_secret_key_change...  | JWT signing key      |
| DB_PATH     | ./database.sqlite              | SQLite file path     |

### Production – Vercel Dashboard

| Name           | Description                           |
|----------------|---------------------------------------|
| `JWT_SECRET`   | JWT signing key (same as local)       |
| `DATABASE_URL` | Neon PostgreSQL connection string     |

`VERCEL=true` is set automatically by Vercel and detected in code.

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
- **Backend:** Node.js, Express, JWT, bcryptjs
- **Database:** SQLite (local) / PostgreSQL via Neon (Vercel)
