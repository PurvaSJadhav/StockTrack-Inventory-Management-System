### StockTrack: Inventory Management System 📦
StockTrack is a full-stack web application designed to provide a simple and efficient solution for managing products, tracking stock levels, and analyzing sales data. Built with the MERN stack, it features a secure RESTful API and a responsive, user-friendly interface.

## ✨ Features
User Authentication: Secure user registration and login system using JSON Web Tokens (JWT).
Product Management (CRUD): Admins can easily add, view, edit, and delete products.
Dynamic Inventory List: View all products with real-time search and filtering capabilities.
Automatic Stock Updates: Stock levels are automatically decremented when a sale is recorded.
Low-Stock Alerts: A visual badge highlights products with stock levels below 5.
Sales Analytics: A dedicated sales report page showing total revenue and best-selling products.
Responsive Design: A clean, modern interface that works on both desktop and mobile devices.

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, React Router, Axios
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JSON Web Tokens (JWT), bcryptjs, cors

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have the following installed on your machine:
Node.js (v18 or later)
npm
MongoDB (or a MongoDB Atlas account)

### Backend Setup
- Navigate to the backend directory:
- cd backend
- npm install
- Create a .env file in the backend root directory and add the following environment variables:

# Code snippet
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
Start the backend server:

- npm run dev
- The server will be running on http://localhost:5000.

### Frontend Setup
- Open a new terminal and navigate to the frontend directory:
- cd frontend
- npm install
- Create a .env file in the frontend root directory and add the following:

# Code snippet
VITE_API_URL=http://localhost:5000/api

- npm run dev
The application will be accessible at http://localhost:5173 (or another port if 5173 is in use).

## 🔐 API Endpoints
All product and sales routes are protected and require a valid JWT.

Method	Endpoint	        Description
POST	/api/auth/register	Register a new user.
POST	/api/auth/login	    Log in a user and get a token.
GET	    /api/products	    Get all products (with search).
POST	/api/products	    Add a new product.
PUT	    /api/products/:id	Update a product by ID.
DELETE	/api/products/:id	Delete a product by ID.
POST	/api/sales	        Record a new sale.
GET	    /api/sales/report	Get the sales report.

# ✒️ Author
Purva Jadhav