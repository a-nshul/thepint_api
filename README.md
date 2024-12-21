# E-Commerce API Project

This is an e-commerce backend project that provides essential APIs and cron jobs for managing user registration, product management, order management, and automated tasks like stock monitoring and order reminders. The project is built with **Node.js**, **Express**, **MongoDB**, and uses **JWT** for authentication.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [API Documentation](#api-documentation)
5. [Cron Jobs](#cron-jobs)
6. [Validation & Error Handling](#validation--error-handling)
7. [Authentication](#authentication)
8. [Environment Variables](#environment-variables)

---

## Features

### 1. **User Registration and Login API**
- **Register User**:
  - Input: `name`, `email`, `password`
  - Password is hashed and validated for a unique email.
- **Login User**:
  - Input: `email`, `password`
  - Validates user credentials and returns a JWT authentication token.

### 2. **Product Management APIs**
- **Create Product**:
  - Input: `name`, `description`, `price`, `stock`
  - Adds a new product to the system.
- **Update Product**:
  - Updates product fields like `price`, `stock`, or `description` by `product ID`.
- **Get All Products**:
  - Fetches all products with pagination and filters by price range, stock availability, or search by product name.
- **Delete Product**:
  - Soft deletion of products (sets a flag indicating the product is deleted but does not remove it from the database).

### 3. **Order Management APIs**
- **Create Order**: Creates a new order for the user.
- **Get All Orders for a User**: Fetches all orders placed by a user.
- **Update Order Status**: Updates the order status (e.g., "Pending", "Processing", "Shipped", "Delivered", "Cancelled").
- **Delete Order**: Soft deletes an order.

### 4. **Cron Jobs**
- **Product Stock Monitoring Cron**:
  - Runs daily at midnight.
  - If a product's stock falls below 10, notifies the admin via email.
- **Order Fulfillment Reminder Cron**:
  - Runs every hour.
  - Sends reminders for pending orders that were created more than 24 hours ago.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user, product, and order data.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Nodemailer**: For sending email notifications (e.g., low stock alerts and order reminders).
- **Cron**: For scheduling tasks like stock monitoring and order reminders.
- **Joi**: Input validation library.
- **Mongoose**: For interacting with MongoDB using an object data modeling (ODM) approach.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/a-nshul/thepint_api.git
cd ecommerce-api


### 2. install npm 

npm install 

###  start the server 


npm start or npm run dev