# Techloom.ai — Software Engineer Intern Assessment

> Full-stack implementation of the Techloom.ai Software Engineer Intern Practical Assessment.

## 🔗 Live Links

| Project | Frontend | Backend / API |
|---|---|---|
| **Task 01 — POS Order & Inventory System** | https://techloom-pos-frontend.netlify.app | https://techloom-intern-assessment-zc1u.onrender.com/docs |
| **Task 02 — E-Commerce Checkout & Payment** | https://techloom-ecommerce-frontend.netlify.app | **Add Task 02 Render URL** |

**GitHub Repository:** https://github.com/MohamadSanas/techloom-intern-assessment

---

## 📌 Assessment Overview

This repository contains both required sections of the Techloom.ai Software Engineer Intern practical assessment.

The projects focus on reliable e-commerce transaction handling, including inventory management, stock reservation, concurrency safety, mock payments, cancellation, refunds, idempotency, and order lifecycle management.

The repository is organized exactly as requested:

```text
techloom-intern-assessment/
├── README.md
├── task-01/
│   ├── backend/
│   └── frontend/
└── task-02/
    ├── backend/
    └── frontend/
```

---

# Task 01 — POS Order & Inventory System

A concurrency-safe POS order and inventory management system designed to prevent overselling while supporting stock reservations and payment simulation.

### Key Features

- Product CRUD
- Current inventory / stock tracking
- Cart creation and item management
- Checkout with stock reservation
- Transaction-safe inventory updates
- Concurrent checkout protection
- Five-minute reservation expiry
- Automatic stock release after reservation expiry
- Mock payment success, failure, and timeout flows
- Duplicate payment/order submission protection
- Idempotency support
- Order status lifecycle management
- Order cancellation with stock restoration
- PostgreSQL persistence
- FastAPI REST API
- React + TypeScript frontend
- Swagger/OpenAPI API documentation
- Automated backend tests

### Live Deployment

**Frontend:** https://techloom-pos-frontend.netlify.app

**Backend API:** https://techloom-intern-assessment-zc1u.onrender.com

**Swagger Docs:** https://techloom-intern-assessment-zc1u.onrender.com/docs

---

# Task 02 — E-Commerce Checkout & Payment

A full-stack e-commerce checkout system covering product discovery, cart management, stock reservation, mock payment processing, cancellation, refunds, and order history.

### Key Features

- Product listing and discovery
- Product search
- Category / price / availability filtering
- Product detail views
- Cart management
- Checkout flow
- Stock reservation before payment
- Mock payment success, failure, and timeout
- Duplicate checkout/payment protection
- Idempotent checkout operations
- Order status management
- Order cancellation
- Refund simulation
- Order history
- PostgreSQL persistence
- FastAPI REST API
- React + TypeScript frontend

### Live Deployment

**Frontend:** https://techloom-ecommerce-frontend.netlify.app

**Backend API:** Add the deployed Task 02 Render URL here.

---

# 🛠️ Technology Stack

## Backend

- Python
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Pydantic
- Pytest
- HTTPX

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- Tailwind CSS

## Deployment

- Netlify — frontend hosting
- Render — backend hosting
- Neon PostgreSQL — database hosting

---

# 🚀 Local Setup

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL / Neon PostgreSQL database
- Git

---

## Task 01 Backend

```bash
cd task-01/backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` from `.env.example` and configure:

```env
DATABASE_URL=<postgresql-database-url>
APP_ENV=development
CORS_ORIGINS=http://localhost:5173
RESERVATION_EXPIRY_MINUTES=5
```

Run migrations:

```bash
alembic upgrade head
```

Start the API:

```bash
uvicorn app.main:app --reload
```

API:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

---

## Task 01 Frontend

```bash
cd task-01/frontend
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Task 02 Backend

```bash
cd task-02/backend
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the environment variables using:

```text
.env.example
```

Run the database migrations required by the project and start the API using the project's configured FastAPI entry point.

Example:

```bash
uvicorn app.main:app --reload
```

---

## Task 02 Frontend

```bash
cd task-02/frontend
npm install
```

Create `.env` with the backend URL:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run:

```bash
npm run dev
```

---

# 🧪 Testing

## Task 01

From the backend directory:

```bash
pytest
```

The test suite covers important transaction and order-processing behavior, including stock validation, checkout behavior, reservation handling, and concurrency-related scenarios.

## Manual Testing

### Task 01

1. Open the live frontend.
2. Create or view products.
3. Verify current stock.
4. Add an available product to a cart.
5. Checkout the cart.
6. Verify that stock is reserved.
7. Test mock payment success.
8. Test mock payment failure.
9. Test payment timeout / reservation expiry.
10. Attempt duplicate checkout/payment submission.
11. Cancel an eligible order.
12. Verify that stock is restored where applicable.
13. Use the concurrency stress-test interface to send simultaneous checkout requests and verify that inventory never becomes negative.

### Task 02

1. Browse products.
2. Search and filter products.
3. Open a product detail page.
4. Add products to the cart.
5. Update/remove cart items.
6. Start checkout.
7. Verify stock reservation before payment.
8. Test payment success.
9. Test payment failure.
10. Test payment timeout.
11. Test duplicate checkout/payment attempts.
12. Cancel an eligible order.
13. Test refund simulation.
14. Review order history and status changes.

---

# 🔐 Environment Variables

Environment files containing secrets are intentionally excluded from Git.

Each project contains an `.env.example` file describing the required configuration.

Typical variables include:

```env
DATABASE_URL=<database-connection-string>
APP_ENV=production
CORS_ORIGINS=<frontend-url>
RESERVATION_EXPIRY_MINUTES=5
```

Frontend deployments use:

```env
VITE_API_BASE_URL=<deployed-backend-url>
```

**Never commit real database passwords, API keys, or other secrets to the repository.**

---

# 🏗️ Architecture

```text
                    ┌───────────────────────┐
                    │       Netlify         │
                    │ React + TypeScript UI │
                    └───────────┬───────────┘
                                │ HTTPS
                                ▼
                    ┌───────────────────────┐
                    │        Render         │
                    │      FastAPI API      │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Neon PostgreSQL     │
                    │ Transactions + Data  │
                    └───────────────────────┘
```

---

# ⚙️ Engineering Focus

The main engineering focus of these projects is **correctness under concurrent operations** rather than only implementing the happy-path UI.

Important mechanisms include:

- Database transactions
- Row-level locking where required
- Atomic stock updates
- Reservation lifecycle handling
- Idempotency keys
- Explicit order state transitions
- Payment failure recovery
- Stock restoration after cancellation/expiry
- Input validation
- API error handling
- CORS configuration for deployed frontends

---

# 📋 Assessment Submission Checklist

- [x] Both sections included in one public GitHub repository
- [x] Repository organized into `/task-01` and `/task-02`
- [x] Task 01 frontend deployed
- [x] Task 01 backend deployed
- [x] Task 02 frontend deployed
- [ ] Task 02 backend deployed and URL added above
- [x] README includes technology stack
- [x] README includes setup instructions
- [x] README includes environment variable information
- [x] README includes testing instructions
- [x] Live deployment links included
- [ ] Optional screen walkthrough link

---

# 📄 License

This project was created as part of the Techloom.ai Software Engineer Intern practical assessment.
