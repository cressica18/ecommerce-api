# ecommerce-api

A REST API for an e-commerce platform built with TypeScript and Express. Supports product management, a shopping cart, and order creation backed by an in-memory data store.

![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)

---

## Tech Stack

| | |
|---|---|
| Language | TypeScript `^5.3.3` |
| Runtime | Node.js 20+ |
| Framework | Express `^4.18.2` |
| Validation | Zod `^3.22.4` |
| ID generation | uuid `^9.0.0` |
| Dev server | ts-node-dev `^2.0.0` |
| Data store | In-memory arrays (no database) |

---

## Project Structure

```
src/
├── app.ts
├── controllers/
│   ├── cart.controller.ts
│   ├── order.controller.ts
│   └── product.controller.ts
├── data/
│   └── store.ts
├── errors/
│   └── AppError.ts
├── middleware/
│   ├── errorHandler.ts
│   └── validate.ts
├── routes/
│   ├── cart.routes.ts
│   ├── order.routes.ts
│   └── product.routes.ts
├── services/
│   ├── cart.service.ts
│   ├── order.service.ts
│   └── product.service.ts
└── types/
    └── index.ts
```

---

## Setup

**Prerequisites:** Node.js v20+

```bash
# Install dependencies
npm install

# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Run compiled output
npm start
```

The server starts at `http://localhost:3000`.

---

## API Endpoints

### Health

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Server health check |

### Products

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/products` | List products with optional filters and pagination |
| `GET` | `/products/:id` | Get a product by ID |
| `POST` | `/products` | Create a product |
| `PUT` | `/products/:id` | Update a product |
| `DELETE` | `/products/:id` | Delete a product |

**`GET /products` — query parameters**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | — | Filter by category |
| `minPrice` | number | — | Minimum price |
| `maxPrice` | number | — | Maximum price |
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Results per page |

### Cart

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/cart` | Get the current cart |
| `POST` | `/cart` | Add an item to the cart |
| `PUT` | `/cart/:productId` | Update item quantity |
| `DELETE` | `/cart/:productId` | Remove a specific item |
| `DELETE` | `/cart` | Clear the entire cart |

### Orders

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/orders` | Create an order from the current cart |
| `GET` | `/orders` | List all orders |
| `GET` | `/orders/:id` | Get an order by ID |

---

## Request Bodies

**`POST /products`**
```json
{
  "name": "Mechanical Keyboard",
  "description": "TKL keyboard with Cherry MX Red switches.",
  "price": 129.99,
  "category": "electronics",
  "stock": 30
}
```

**`PUT /products/:id`** — all fields optional
```json
{
  "price": 119.99,
  "stock": 25
}
```

**`POST /cart`**
```json
{
  "productId": "a1b2c3d4-e5f6-...",
  "quantity": 2
}
```

**`PUT /cart/:productId`**
```json
{
  "quantity": 3
}
```

**`POST /orders`** — no body required; creates an order from the current cart

---

## Example curl Requests

```bash
# List products in a category with pagination
curl "http://localhost:3000/products?category=electronics&page=1&limit=5"

# Get a single product
curl "http://localhost:3000/products/<id>"

# Create a product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"USB-C Hub","description":"7-in-1 hub.","price":49.99,"category":"electronics","stock":80}'

# Add an item to the cart
curl -X POST http://localhost:3000/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"<id>","quantity":2}'

# View the cart
curl http://localhost:3000/cart

# Place an order
curl -X POST http://localhost:3000/orders

# View all orders
curl http://localhost:3000/orders
```

---

## Sample Responses

**`GET /products`**
```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-...",
      "name": "Mechanical Keyboard",
      "description": "TKL keyboard with Cherry MX Red switches.",
      "price": 129.99,
      "category": "electronics",
      "stock": 30,
      "createdAt": "2025-07-01T10:00:00.000Z",
      "updatedAt": "2025-07-01T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "totalPages": 1
  }
}
```

**`GET /cart`**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": "a1b2c3d4-...",
        "quantity": 2,
        "product": {
          "id": "a1b2c3d4-...",
          "name": "Mechanical Keyboard",
          "description": "TKL keyboard with Cherry MX Red switches.",
          "price": 129.99,
          "category": "electronics",
          "stock": 30,
          "createdAt": "2025-07-01T10:00:00.000Z",
          "updatedAt": "2025-07-01T10:00:00.000Z"
        },
        "subtotal": 259.98
      }
    ],
    "total": 259.98
  }
}
```

**`POST /orders`**
```json
{
  "success": true,
  "data": {
    "id": "f9e8d7c6-...",
    "items": [
      {
        "productId": "a1b2c3d4-...",
        "productName": "Mechanical Keyboard",
        "quantity": 2,
        "priceAtPurchase": 129.99,
        "subtotal": 259.98
      }
    ],
    "total": 259.98,
    "status": "confirmed",
    "createdAt": "2025-07-01T10:05:00.000Z"
  }
}
```

---

## Error Handling

All error responses follow a consistent shape:

```json
{
  "success": false,
  "message": "Product not found"
}
```

Validation errors include a field-level breakdown:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "price": ["Price must be positive"],
    "stock": ["Stock must be an integer"]
  }
}
```

| Status | When |
|--------|------|
| `200` | Successful read or update |
| `201` | Resource created |
| `400` | Validation error or empty cart on order creation |
| `404` | Resource not found |
| `409` | Insufficient stock when placing an order |
| `500` | Unexpected server error |

### Order creation flow

`POST /orders` executes the following sequence atomically:

1. Reads the current cart
2. Validates each product exists
3. Validates stock is sufficient for each item
4. Returns `409` if any item exceeds available stock (no changes made)
5. Deducts stock for all items
6. Creates the order with prices captured at time of purchase
7. Clears the cart
8. Returns the created order