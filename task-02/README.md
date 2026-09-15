# E-Commerce Checkout System

A full-stack e-commerce checkout system built with React, TypeScript, FastAPI, and PostgreSQL.

The system provides a complete shopping experience from product discovery and cart management to checkout, stock reservation, mock payment processing, refunds, cancellation, and order history.

The project focuses on reliable checkout processing, inventory consistency, payment failure handling, duplicate-payment prevention, and a clean customer-facing shopping experience.

---

## Overview

This project simulates a real-world e-commerce platform where customers can browse products, search and filter products, add products to a shopping cart, proceed through checkout, reserve inventory, and complete a simulated payment.

The system handles:

- Successful payments
- Failed payments
- Payment timeouts
- Stock reservation
- Inventory release
- Duplicate payment attempts
- Order cancellation
- Refund simulation
- Order history

---

## Features

### Product Discovery

Customers can:

- View products
- Search products
- Filter by category
- Filter by price range
- Filter by availability
- View product details
- View product price
- View available stock

Example:

Product Listing
    |
    +-- Search
    +-- Category Filter
    +-- Price Filter
    +-- Availability Filter

---

## Product Details

Each product has a dedicated details view.

The product details page displays:

- Product name
- Description
- Price
- Category
- Available stock
- Product information
- Add-to-cart option

---

## Shopping Cart

Customers can:

- Add products to cart
- Update quantities
- Remove products
- View cart items
- View item prices
- View total amount
- Continue shopping
- Proceed to checkout

Example:

Product A x 2
Product B x 1
Product C x 3
----------------
Total: $XXX.XX

---

## Checkout

The checkout process reserves inventory before payment is attempted.

Flow:

Cart
  |
  v
Checkout
  |
  v
Validate Items
  |
  v
Reserve Stock
  |
  v
Create Checkout Session
  |
  v
Payment

Stock is reserved before payment processing begins.

---

## Stock Reservation

When a customer enters checkout:

Available Stock
      |
      v
Reserve Required Quantity
      |
      v
Checkout Session
      |
      v
Payment Attempt

If payment does not complete, the reserved inventory is released.

This prevents products from remaining permanently unavailable after failed or abandoned checkout attempts.

---

## Reservation Flow

                    Checkout
                       |
                       v
                Validate Cart
                       |
                       v
                 Reserve Stock
                       |
                       v
              Reservation Created
                       |
              +--------+--------+
              |                 |
              v                 v
        Payment Success     Reservation Timeout
              |                 |
              v                 v
            PAID             EXPIRED
                                |
                                v
                          Release Stock

---

## Mock Payment Gateway

The project includes a simulated payment gateway.

Supported outcomes:

- Success
- Failure
- Timeout

### Successful Payment

Checkout
   |
   v
Stock Reserved
   |
   v
Payment Success
   |
   v
Order Confirmed

### Failed Payment

Checkout
   |
   v
Stock Reserved
   |
   v
Payment Failed
   |
   v
Stock Released
   |
   v
Order Failed

### Payment Timeout

Checkout
   |
   v
Stock Reserved
   |
   v
Payment Timeout
   |
   v
Reservation Expires
   |
   v
Stock Released

---

## Duplicate Payment Protection

The system prevents multiple payment attempts from creating multiple charges or multiple orders for the same checkout session.

Example:

Payment Request #1
       |
       v
Payment Processed
       |
       v
Payment Recorded

Payment Request #2
       |
       v
Same Idempotency Key
       |
       v
Existing Payment Returned

Expected result:

One checkout session
        |
        v
One successful payment
        |
        v
One order

---

## Duplicate Checkout Protection

Checkout requests support idempotency.

Example:

Checkout Request #1
       |
       v
Order Created

Checkout Request #2
       |
       v
Same Idempotency Key
       |
       v
Existing Order Returned

This prevents duplicate checkout requests from creating multiple orders or deducting inventory multiple times.

---

## Order Management

Customers can view their orders and their current statuses.

Order statuses include:

- PENDING
- RESERVED
- PAID
- FAILED
- EXPIRED
- CANCELLED
- REFUNDED

The system enforces valid order state transitions.

---

## Order Lifecycle

PENDING
   |
   v
RESERVED
   |
   +-------------------+
   |                   |
   v                   v
PAID                 FAILED
   |                   |
   v                   |
CANCELLED              |
   |                   |
   v                   v
REFUNDED          Stock Released

Reservation timeout:

RESERVED
   |
   v
EXPIRED
   |
   v
Stock Released

---

## Order Cancellation

Customers can cancel eligible orders.

Cancellation flow:

Order
  |
  v
Validate Status
  |
  v
Cancel Order
  |
  v
Restore Stock
  |
  v
Refund Payment

For eligible paid orders:

PAID
  |
  v
CANCELLED
  |
  v
Refund Requested
  |
  v
REFUNDED

---

## Refund Simulation

Cancelled or eligible paid orders support simulated refunds.

The refund is simulated and does not connect to a real payment provider.

Example:

PAID
  |
  v
CANCELLED
  |
  v
Refund Requested
  |
  v
REFUNDED

Refund information includes:

- Refund ID
- Order ID
- Payment ID
- Refund amount
- Refund status
- Created timestamp

---

## Order History

Customers can view their previous orders.

The order history includes:

- Order ID
- Order date
- Order total
- Order status
- Items
- Quantities
- Payment status

Example:

Order #1001
Status: PAID
Total: $120.00

Order #1002
Status: REFUNDED
Total: $75.00

Order #1003
Status: CANCELLED
Total: $45.00

---

## Complete Checkout Flow

                    Product Discovery
                           |
                           v
                    Product Details
                           |
                           v
                          Cart
                           |
                           v
                       Checkout
                           |
                           v
                    Stock Reservation
                           |
                           v
                     Payment Attempt
                    /       |        \
                   /        |         \
              SUCCESS    FAILURE    TIMEOUT
                 |           |          |
                 v           v          v
               PAID       FAILED     EXPIRED
                 |           |          |
                 |           +-----+----+
                 |                 |
                 |                 v
                 |           Release Stock
                 |
                 v
             Order History
                 |
                 v
             Cancellation
                 |
                 v
               Refund

---

## Architecture

+---------------------------------+
|         React Frontend          |
|                                 |
| Products -> Details -> Cart     |
|                     |           |
|                     v           |
|                  Checkout       |
|                     |           |
|                     v           |
|               Order History     |
+---------------+-----------------+
                |
                | REST API
                v
+---------------------------------+
|         FastAPI Backend         |
|                                 |
| API Routes                      |
|      |                          |
|      v                          |
| Schemas / Validation            |
|      |                          |
|      v                          |
| Service Layer                   |
|      |                          |
|      v                          |
| Repository Layer                |
|      |                          |
|      v                          |
| SQLAlchemy                      |
+---------------+-----------------+
                |
                v
+---------------------------------+
|           PostgreSQL            |
|                                 |
| Products                        |
| Carts                           |
| Orders                          |
| Payments                        |
| Reservations                    |
| Refunds                         |
+---------------------------------+

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS

### Backend

- Python
- FastAPI
- Pydantic
- SQLAlchemy
- Alembic

### Database

- PostgreSQL

### Testing

- Pytest
- HTTPX

### API Documentation

- Swagger UI
- OpenAPI
- ReDoc

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL

---

## Project Structure

ecommerce-checkout-system/
|
+-- backend/
|   |
|   +-- app/
|   |   |
|   |   +-- api/
|   |   |   |
|   |   |   +-- routes/
|   |   |       |
|   |   |       +-- products.py
|   |   |       +-- carts.py
|   |   |       +-- checkout.py
|   |   |       +-- payments.py
|   |   |       +-- orders.py
|   |   |       +-- refunds.py
|   |   |
|   |   +-- core/
|   |   |   +-- config.py
|   |   |   +-- database.py
|   |   |
|   |   +-- models/
|   |   |   +-- product.py
|   |   |   +-- cart.py
|   |   |   +-- order.py
|   |   |   +-- payment.py
|   |   |   +-- reservation.py
|   |   |   +-- refund.py
|   |   |
|   |   +-- schemas/
|   |   |   +-- product.py
|   |   |   +-- cart.py
|   |   |   +-- checkout.py
|   |   |   +-- payment.py
|   |   |   +-- order.py
|   |   |   +-- refund.py
|   |   |
|   |   +-- services/
|   |   |   +-- product_service.py
|   |   |   +-- cart_service.py
|   |   |   +-- checkout_service.py
|   |   |   +-- payment_service.py
|   |   |   +-- order_service.py
|   |   |   +-- refund_service.py
|   |   |
|   |   +-- repositories/
|   |   |   +-- product_repository.py
|   |   |   +-- cart_repository.py
|   |   |   +-- order_repository.py
|   |   |   +-- payment_repository.py
|   |   |
|   |   +-- utils/
|   |       +-- idempotency.py
|   |       +-- state_machine.py
|   |
|   +-- migrations/
|   |
|   +-- tests/
|       +-- test_products.py
|       +-- test_search.py
|       +-- test_cart.py
|       +-- test_checkout.py
|       +-- test_payments.py
|       +-- test_orders.py
|       +-- test_refunds.py
|   |
|   +-- .env.example
|   +-- requirements.txt
|   +-- README.md
|
+-- frontend/
|   |
|   +-- src/
|   |   |
|   |   +-- components/
|   |   +-- pages/
|   |   |   +-- Home/
|   |   |   +-- Products/
|   |   |   +-- ProductDetails/
|   |   |   +-- Cart/
|   |   |   +-- Checkout/
|   |   |   +-- Orders/
|   |   |
|   |   +-- services/
|   |   +-- hooks/
|   |   +-- types/
|   |   +-- layouts/
|   |   +-- App.tsx
|   |   +-- main.tsx
|   |
|   +-- public/
|   +-- .env.example
|   +-- package.json
|   +-- vite.config.ts
|
+-- .gitignore
+-- README.md

---

## Core Data Model

Product
   |
   +----------------+
   |                |
   v                v
CartItem         OrderItem
                    |
                    v
                  Order
                    |
          +---------+---------+
          |         |         |
          v         v         v
    Reservation  Payment   Refund

### Product

Product
-------
id
name
description
category
price
stock
created_at
updated_at

### Cart

Cart
----
id
created_at
updated_at

### Cart Item

CartItem
--------
id
cart_id
product_id
quantity

### Order

Order
-----
id
cart_id
status
total_amount
created_at
updated_at

### Order Item

OrderItem
---------
id
order_id
product_id
quantity
unit_price

### Reservation

Reservation
-----------
id
order_id
product_id
quantity
status
expires_at
created_at
updated_at

### Payment

Payment
-------
id
order_id
status
amount
idempotency_key
created_at
updated_at

### Refund

Refund
------
id
order_id
payment_id
status
amount
created_at
updated_at

---

## API Endpoints

### Products

GET    /api/products
GET    /api/products/{product_id}
POST   /api/products
PATCH  /api/products/{product_id}
DELETE /api/products/{product_id}

### Product Search and Filtering

GET /api/products?search=laptop

GET /api/products?category=electronics

GET /api/products?min_price=100&max_price=500

GET /api/products?available=true

Combined example:

GET /api/products?search=laptop&category=electronics&min_price=500&max_price=2000&available=true

### Cart

POST   /api/carts
GET    /api/carts/{cart_id}
POST   /api/carts/{cart_id}/items
PATCH  /api/carts/{cart_id}/items/{item_id}
DELETE /api/carts/{cart_id}/items/{item_id}

### Checkout

POST /api/carts/{cart_id}/checkout

Example header:

Idempotency-Key: checkout-12345

### Payments

POST /api/checkout/{checkout_id}/payment

Supported outcomes:

- success
- failure
- timeout

### Orders

GET  /api/orders
GET  /api/orders/{order_id}
POST /api/orders/{order_id}/cancel

### Refunds

POST /api/orders/{order_id}/refund

---

## Checkout Processing

When checkout begins:

1. Validate cart
2. Validate product availability
3. Validate quantities
4. Start database transaction
5. Reserve stock
6. Create order
7. Create reservation
8. Create checkout session
9. Commit transaction
10. Return checkout information

---

## Payment Processing

Payment request:

POST /api/checkout/{checkout_id}/payment

Idempotency-Key: payment-12345

Possible outcomes:

### Success

success
  |
  v
Order -> PAID

### Failure

failure
  |
  v
Order -> FAILED
  |
  v
Stock Released

### Timeout

timeout
  |
  v
Reservation Expires
  |
  v
Stock Released

---

## Inventory Handling

Example:

Initial Stock = 10

Customer buys 3
       |
       v
Reserved = 3
       |
       v
Available = 7

If payment succeeds:

Reserved = 3
Available = 7
Order = PAID

If payment fails:

Reservation Released
Available = 10
Order = FAILED

If payment times out:

Reservation Expires
Available = 10
Order = EXPIRED

---

## Order Cancellation and Refund

For a paid order:

PAID
  |
  v
Cancellation Request
  |
  v
CANCELLED
  |
  v
Refund Process
  |
  v
REFUNDED

The system prevents invalid operations such as:

- Refunding an unpaid order
- Refunding an already refunded order
- Cancelling an already cancelled order
- Cancelling an expired order where cancellation is not allowed

---

## Error Handling

The API handles errors such as:

- Product not found
- Cart not found
- Order not found
- Checkout not found
- Insufficient stock
- Invalid quantity
- Invalid payment outcome
- Duplicate payment
- Duplicate checkout
- Invalid order state
- Refund not allowed
- Order already cancelled
- Order already refunded

Example:

{
  "detail": "Insufficient stock for product"
}

---

## Testing Strategy

The application includes automated backend tests.

### Product Tests

- Product listing
- Product search
- Category filtering
- Price filtering
- Availability filtering
- Product details

### Cart Tests

- Create cart
- Add item
- Update quantity
- Remove item
- Invalid quantity

### Checkout Tests

- Successful checkout
- Insufficient stock
- Empty cart
- Invalid cart
- Duplicate checkout
- Stock reservation

### Payment Tests

- Successful payment
- Failed payment
- Payment timeout
- Duplicate payment
- Invalid payment outcome
- Payment for invalid checkout

### Order Tests

- Order creation
- Order history
- Order cancellation
- Invalid cancellation
- Order status transitions

### Refund Tests

- Successful refund
- Duplicate refund
- Refund after cancellation
- Invalid refund
- Correct refund amount

---

## Example End-to-End Flow

1. Customer opens storefront
2. Customer searches for a product
3. Customer applies filters
4. Customer opens product details
5. Customer adds product to cart
6. Customer opens cart
7. Customer starts checkout
8. Stock is reserved
9. Payment is attempted
10. Payment succeeds
11. Order becomes PAID
12. Order appears in history
13. Customer cancels the order
14. Refund is simulated
15. Order becomes REFUNDED

---

## Environment Variables

### Backend

Create:

backend/.env

Example:

DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@localhost:5432/ecommerce_system

APP_ENV=development

CORS_ORIGINS=http://localhost:5173

RESERVATION_EXPIRY_MINUTES=5

### Frontend

Create:

frontend/.env

Example:

VITE_API_URL=http://localhost:8000

---

## Local Development

### Prerequisites

Install:

- Python 3.11+
- Node.js
- npm
- PostgreSQL
- Git

---

## Clone Repository

git clone https://github.com/YOUR_USERNAME/ecommerce-checkout-system.git

cd ecommerce-checkout-system

---

## Backend Setup

Navigate to backend:

cd backend

Create a virtual environment:

python -m venv venv

Windows:

venv\Scripts\activate

Linux/macOS:

source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Create environment file:

cp .env.example .env

Configure PostgreSQL in .env.

Run migrations:

alembic upgrade head

Start FastAPI:

uvicorn app.main:app --reload

Backend:

http://localhost:8000

Swagger:

http://localhost:8000/docs

ReDoc:

http://localhost:8000/redoc

---

## Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Create environment file:

cp .env.example .env

Configure:

VITE_API_URL=http://localhost:8000

Start development server:

npm run dev

Frontend:

http://localhost:5173

---

## Testing

Run all backend tests:

pytest

Run with verbose output:

pytest -v

Run product tests:

pytest tests/test_products.py -v

Run search tests:

pytest tests/test_search.py -v

Run checkout tests:

pytest tests/test_checkout.py -v

Run payment tests:

pytest tests/test_payments.py -v

Run refund tests:

pytest tests/test_refunds.py -v

---

## API Documentation

FastAPI automatically generates API documentation.

Swagger UI:

http://localhost:8000/docs

ReDoc:

http://localhost:8000/redoc

OpenAPI:

http://localhost:8000/openapi.json

---

## Deployment

The application is designed for separate frontend and backend deployment.

                Internet
                   |
                   v
        +---------------------+
        |   React Frontend    |
        |       Vercel        |
        +----------+----------+
                   |
                   | HTTPS
                   v
        +---------------------+
        |   FastAPI Backend   |
        |       Render        |
        +----------+----------+
                   |
                   v
        +---------------------+
        |     PostgreSQL      |
        +---------------------+

### Frontend

Vercel

### Backend

Render

### Database

PostgreSQL

---

## Live Demo

### Storefront

Coming soon.

### Backend API

Coming soon.

### Swagger Documentation

Coming soon.

---

## Engineering Decisions

### Why React?

React provides a component-based architecture suitable for building a customer-facing e-commerce interface.

### Why Vite?

Vite provides a fast development environment and production build system for the React frontend.

### Why TypeScript?

TypeScript provides compile-time type checking and makes frontend API models easier to maintain.

### Why FastAPI?

FastAPI provides:

- Request validation
- Type-safe API schemas
- Automatic OpenAPI documentation
- High-performance API handling
- Dependency injection

### Why PostgreSQL?

PostgreSQL provides reliable transactional behavior and strong data consistency for orders, payments, inventory, and reservations.

### Why SQLAlchemy?

SQLAlchemy provides a flexible database abstraction layer and transaction management for the FastAPI backend.

### Why Idempotency?

Payment and checkout requests can be retried because of network failures.

Idempotency prevents retries from creating duplicate payments or orders.

---

## Security Considerations

The application includes:

- Input validation
- Database constraints
- Controlled order state transitions
- Idempotency protection
- Transaction-safe operations
- CORS configuration
- Environment-based configuration
- Secrets stored outside source control

Sensitive environment variables must never be committed to Git.

---

## Project Status

### Backend

- [ ] FastAPI setup
- [ ] PostgreSQL connection
- [ ] SQLAlchemy models
- [ ] Alembic migrations
- [ ] Product API
- [ ] Product search
- [ ] Product filtering
- [ ] Product details
- [ ] Cart API
- [ ] Checkout
- [ ] Stock reservation
- [ ] Reservation expiration
- [ ] Mock payment gateway
- [ ] Payment success handling
- [ ] Payment failure handling
- [ ] Payment timeout handling
- [ ] Idempotency
- [ ] Order lifecycle
- [ ] Order cancellation
- [ ] Refund simulation
- [ ] Order history
- [ ] Error handling
- [ ] Automated tests

### Frontend

- [ ] React + Vite setup
- [ ] Product listing
- [ ] Search
- [ ] Category filtering
- [ ] Price filtering
- [ ] Availability filtering
- [ ] Product details
- [ ] Shopping cart
- [ ] Checkout
- [ ] Payment simulation
- [ ] Order confirmation
- [ ] Order history
- [ ] Cancellation
- [ ] Refund status
- [ ] Error handling
- [ ] Responsive design

### Deployment

- [ ] PostgreSQL deployment
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Environment configuration
- [ ] Production testing
- [ ] Swagger deployment
- [ ] Final end-to-end testing

---

## Future Improvements

Potential future improvements include:

- User authentication
- User accounts
- Product reviews
- Wishlist
- Real payment gateway integration
- Redis caching
- Message queues
- Email notifications
- Inventory alerts
- Docker containerization
- CI/CD pipeline
- Observability and monitoring
- Rate limiting

---

## License

This project is developed as a standalone software engineering project for educational and portfolio purposes.