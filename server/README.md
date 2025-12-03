# E-Commerce REST API

Express + MongoDB backend for the E-Commerce application.

---

## 🛠 Tech Stack

- **Node.js** & **Express** – web server  
- **MongoDB** (via **Mongoose**) – database  
- **JSON Web Tokens** – auth  
- **dotenv** – environment configuration  
- **nodemon** – development reload  

---

## 📁 Directory Structure

. ├── .env ├── package.json ├── README.md ├── server.js └── src ├── config │ └── db.js ├── controllers │ ├── authController.js │ ├── productController.js │ ├── categoryController.js │ ├── orderController.js │ ├── cartController.js │ └── userController.js ├── middleware │ ├── auth.js │ └── errorHandler.js ├── models │ ├── User.js │ ├── Product.js │ ├── Category.js │ ├── Order.js │ └── Cart.js └── routes ├── auth.js ├── products.js ├── categories.js ├── orders.js ├── cart.js └── index.js

---

# Install dependencies

bash
Copy
Edit
npm install
Create a .env file (see below)
node server.js

# ⚙️ Environment Variables
Create a .env in the project root:

dotenv
Copy
Edit
PORT=3007
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here

# API Endpoints

Base URL: http://localhost:3007/api

Authentication

Method	Path	Desc
POST	/auth/register	Register new user
POST	/auth/login	Login & return JWT
Public

Method	Path	Desc
GET	/public/products	List products (with ?page=&limit=&q=)
GET	/public/products/:id	Get single product
GET	/public/categories	List categories (pagination)
GET	/public/categories/:id	Get single category (detail)
Protected (Requires Authorization: Bearer <token>)

Method	Path	Desc
GET	/orders	List user’s orders (admin sees all)
GET	/orders/:id	Get order by ID
POST	/orders	Create order
PUT	/orders/:id	Update order
DELETE	/orders/:id	Delete order
GET	/cart	Get user’s cart
POST	/cart	Add item to cart
DELETE	/cart/:productId	Remove item from cart
PUT	/cart	Update item quantity (optional)

# 📄 License
This project is licensed under the MIT License.