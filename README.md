# Uniblox Assignment

GitHub Repository: [https://github.com/tej-as-kamble/uniblox_assignment](https://github.com/tej-as-kamble/uniblox_assignment)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Assumptions](#assumptions)
- [Future Improvements](#future-improvements)

---

## Overview

This project is a full stack e-commerce store simulation built as part of an assignment. It includes cart and checkout APIs along with admin functionalities. Every **nth** order receives a **10% discount coupon**, which applies to the **entire order**.

---

## Features
- **User Authentication:** Register and login using secure password hashing and JWT-based authentication.
- **Shopping Cart:** Users can add, update, and remove items in their cart before placing an order.
- **Order Placement:** Users place orders for the items in their cart. Each order decreases inventory (if inventory is implemented) and clears the cart.
- **Coupon Generation:** User can request to generate a discount coupon on every *n*-th order (for example, every 5th order). The coupon can be used for discounts on future orders.
- **Coupon Management:** Admins can create new coupons manually, list existing coupons, and deactivate or delete coupons as needed.
- **Admin Dashboard/Stats:** Provides admin-only endpoints to retrieve sales statistics (e.g., total orders, revenue, coupon usage).
- **React Frontend:** A separate React client to interact with the backend API, showcasing the shopping flow and admin features. It uses modern React features and may include Redux for state management.

## Tech Stack
- **Frontend:** React (vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), bcrypt for password hashing
- **Others:** 
  - Environment variables managed with `dotenv`
  - CORS for cross-origin resource sharing

## Installation

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/tej-as-kamble/uniblox_assignment.git
   cd uniblox_assignment
   ```

2. **Setup Backend:**  
   - Navigate to the backend directory:  
     ```bash
     cd Backend
     npm install
     ```  
   - Create a `.env` file in the backend root with the following variables:  
     ```
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     COUPON_NTH_ORDER=5
     PORT=5000
     ```  

3. **Setup Frontend:**  
   - If a React frontend is included, navigate to the `Frontend` directory:  
     ```bash
     cd Frontend
     npm install
     ```

4. **Run the Application:**  
   - **Backend:**  
     ```bash
     npm start
     ```  
   - **Frontend:**  
     ```bash
     npm run dev
     ```  
   - The backend will start on `http://localhost:5000` and the frontend on `http://localhost:5173`. Adjust ports as needed in your `.env`.

## API Documentation

The API is organized into logical groups: Authentication, Products (Items), Cart, Orders, Coupons, and Admin. All endpoints that modify data require a valid JWT passed in the `Authorization` header as a bearer token (e.g., `Authorization: Bearer <token>`). Example request bodies and responses are provided for clarity.

### Authentication
- `POST /api/auth/register` - Register a new user.  
  - **Request Body:** `{ "name": "John Doe", "email": "john@example.com", "password": "securePass" }`  
  - **Response:** `201 Created` with user data (excludes password) and a JWT token.
- `POST /api/auth/login` - Login an existing user.  
  - **Request Body:** `{ "email": "john@example.com", "password": "securePass" }`  
  - **Response:** `200 OK` with user data (excludes password) and a JWT token.

### Products (Items)
- `GET /api/items` - Retrieve a list of all available items/products.
- `GET /api/items/:id` - Retrieve details of a single item by its ID.
- `POST /api/items` -  Create a new item/product.

### Cart
- `GET /api/users/cart/get-cart` - Get the current user's cart contents.
- `POST /api/users/cart/add-item` - Add an item to the cart or update quantity.  
  - **Request Body:** `{ "itemId": "<ITEM_ID>" }`
- `POST /api/cart/users/remove-item/` - Remove an item from the cart.

### Orders
- `GET /api/users/get-orders` - Get all orders of the current user (or all orders if admin).
- `POST /api/users/order-now` - Place a new order with the current cart items.

### Coupons
- `GET /api/users/verify-coupon` - Get all valid coupons for the current user.
- `POST /api/users/create-coupon` - To create a coupon code for a discount.  
- `GET /api/users/coupon-status` - Get the status of a coupon for a user.

### Admin Endpoints
- `GET /api/admin/purchase-stats` - (Admin-only) Retrieve aggregate statistics (e.g., total orders, total revenue, number of coupons issued).
- `GET /api/admin/coupons` - (Admin-only) Retrieve all coupons in the system. 
- `POST /api/admin/coupons-accept/:id` - (Admin-only) Update coupon details.
- `POST /api/admin/coupons-reject/:id` - (Admin-only) Delete or deactivate a coupon.


## Assumptions
- It uses simple list of products.
- No real payment gateway integration is included.
- The discount coupon logic assumes a fixed *n*-th order threshold (configurable via `COUPON_NTH_ORDER`).
- User roles are at least "user" and "admin"; some endpoints are restricted to admin only.

## Future Improvements
- **Front-end Enhancements:** Implement a polished React UI with better state management (e.g., Redux) and responsive design.
- **Payment Integration:** Add real payment processing with a payment provider (Stripe, PayPal).
- **Product Management:** Expand the product catalog to a separate collection and allow categories, search, and pagination.
- **Email Notifications:** Send confirmation emails on order placement and coupon issuance.
