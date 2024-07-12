# Furniture Renting - Odoo Combat

This project is a full-stack application for renting furniture. It is developed as part of a hackathon project named 'Odoo Combat'. The application consists of a backend built with Node.js and Express, and a frontend built with React and Ant Design.

## Project Structure

### Backend

The backend handles the server-side logic and API endpoints. 
## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

#### Install backend dependencies:

```sh
cd backend
npm install
```

### Install frontend dependencies:
```sh
cd ../Odoo_Frontend-main
npm install
```
 
### Environment Variables
Create a .env file in the backend directory and add the necessary environment variables:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
### Running the Application
Start the backend server:
``` sh
cd backend
npm start
```
Start the frontend server:
```sh
cd ../Odoo_Frontend-main
npm run dev
```
## Features

- User authentication (signup, login, logout)
- CRUD operations for bookings, categories, furniture, payments, and reviews
- Payment integration with Razorpay
- Responsive UI built with React and Ant Design
- State management using React Context API
