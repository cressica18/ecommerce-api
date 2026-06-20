# E-Commerce REST API

A production-ready REST API built with TypeScript, Express, and Zod for an e-commerce platform. Uses in-memory storage with seed data.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development mode

```bash
npm run dev
```

Server starts at **http://localhost:3000**

### 3. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── controllers/
│   ├── product.controller.ts
│   ├── cart.controller.ts
│   └── order.controller.ts
├── services/
│   ├── product.service.ts
│   ├── cart.service.ts
│   └── order.service.ts
├── routes/
│   ├── product.routes.ts
│   ├── cart.routes.ts
│   └── order.routes.ts
├── middleware/
│   ├── validate.ts
│   └── errorHandler.ts
├── errors/
│   └── AppError.ts
├── types/
│   └── index.ts
├── data/
│   └── store.ts
└── app.ts
```

---

## API Endpoints

### Health

| Method | Endpoint   | Description        |
|--------|------------|--------------------|
| GET    | `/health`  | Server health check |

---

### Products

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | `/products`        | List all products (with filters + pagination) |
| GET    | `/products/:id`    | Get single product       |
| POST   | `/products`        | Create product           |
| PUT    | `/products/:id`    | Update product           |
| DELETE | `/products/:id`    | Delete product           |

**GET /products — Query Parameters**

| Parameter   | Type   | Description                    |
|-------------|--------|--------------------------------|
| `category`  | string | Filter by category             |
| `minPrice`  | number | Minimum price filter           |
| `maxPrice`  | number | Maximum price filter           |
| `page`      | number | Page number (default: 1)       |
| `limit`     | number | Items per page (default: 10)   |

---

### Cart

| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| GET    | `/cart`                | Get current cart          |
| POST   | `/cart`                | Add item to cart          |
| PUT    | `/cart/:productId`     | Update item quantity       |
| DELETE | `/cart/:productId`     | Remove item from cart      |
| DELETE | `/cart`                | Clear entire cart          |

---

### Orders

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| POST   | `/orders`         | Create order from cart    |
| GET    | `/orders`         | List all orders           |
| GET    | `/orders/:id`     | Get single order          |

---

## Postman Testing Guide

### Step 1 — List products

```
GET http://localhost:3000/products
```

Copy any `id` from the response for use in subsequent requests.

### Step 2 — Filter products

```
GET http://localhost:3000/products?category=electronics&minPrice=100&maxPrice=500&page=1&limit=5
```

### Step 3 — Get single product

```
GET http://localhost:3000/products/<id>
```

### Step 4 — Create product

```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "USB-C Hub",
  "description": "7-in-1 USB-C hub with HDMI, USB-A, SD card reader.",
  "price": 49.99,
  "category": "electronics",
  "stock": 80
}
```

### Step 5 — Update product

```
PUT http://localhost:3000/products/<id>
Content-Type: application/json

{
  "price": 44.99,
  "stock": 90
}
```

### Step 6 — Add item to cart

```
POST http://localhost:3000/cart
Content-Type: application/json

{
  "productId": "<product-id-from-step-1>",
  "quantity": 2
}
```

### Step 7 — View cart

```
GET http://localhost:3000/cart
```

Response includes `items` (with subtotals per item), and `total`.

### Step 8 — Update cart item quantity

```
PUT http://localhost:3000/cart/<productId>
Content-Type: application/json

{
  "quantity": 3
}
```

### Step 9 — Remove item from cart

```
DELETE http://localhost:3000/cart/<productId>
```

### Step 10 — Create order (from current cart)

```
POST http://localhost:3000/orders
```

This will:
1. Read cart
2. Validate products
3. Validate stock (returns 409 if insufficient)
4. Deduct stock
5. Create order
6. Clear cart
7. Return order

### Step 11 — List orders

```
GET http://localhost:3000/orders
```

### Step 12 — Get single order

```
GET http://localhost:3000/orders/<order-id>
```

### Step 13 — Clear cart

```
DELETE http://localhost:3000/cart
```

### Step 14 — Delete product

```
DELETE http://localhost:3000/products/<id>
```

---

## Error Responses

All errors follow this shape:

```json
{
  "success": false,
  "message": "Error description"
}
```

Validation errors also include an `errors` field:

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

### HTTP Status Codes

| Code | Meaning                         |
|------|---------------------------------|
| 200  | OK                              |
| 201  | Created                         |
| 400  | Bad Request / Validation Error  |
| 404  | Not Found                       |
| 409  | Conflict (e.g. stock insufficient) |
| 500  | Internal Server Error           |

---

## Available Product Categories (seed data)

- `electronics`
- `furniture`
- `footwear`
- `accessories`
- `sports`
