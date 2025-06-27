# 📊 Sale Report Backend

This is the backend of a full-featured **Sales Report Management System** built using Node.js, Express, and MongoDB.  
The system supports two roles: **Admin** and **Employee**, with separate capabilities like user authentication, product management, customer tracking, and generating sales reports.

---

## 🚀 Features

### 🧑‍💼 Authentication & Role Management
- Secure login & signup with JWT
- Role-based access (Admin, Employee)

### 📦 Product Management (Admin only)
- Add, update, delete products
- Track available quantity

### 👥 Customer Management
- Create and manage customer data

### 💰 Sales Management
- Create a sale with product and customer reference
- Quantity validation & stock deduction
- Auto calculation of total price

### 📄 Reporting & Filtering
- View and filter all sales
- Search and organize reports by employee or customer

---

🛡 Role-Based Access
Role	Access
Admin	Full access to all resources
Employee	Can add/view customers and create sales only

🔐 Auth Flow
User logs in via /api/auth/login

Server returns JWT

Use Authorization: Bearer <token> header to access protected routes


🧪 To-Do / Future Enhancements
Export reports as PDF/CSV

Date range filter for reports

Email notifications

Dashboard analytics

👨‍💻 Author
Siddharth Singh
GitHub: @Sid9879

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB using Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: Express middleware for role validation
- **Environment Config**: dotenv

---

| Method | Endpoint           | Access         | Description             |
| ------ | ------------------ | -------------- | ----------------------- |
| POST   | `/api/auth/signup` | Public         | Register a new user     |
| POST   | `/api/auth/login`  | Public         | Login and get JWT token |
| GET    | `/api/user`        | Admin          | Get all users           |
| POST   | `/api/product`     | Admin          | Add a new product       |
| GET    | `/api/product`     | Admin          | View all products       |
| PUT    | `/api/product/:id` | Admin          | Update a product        |
| DELETE | `/api/product/:id` | Admin          | Delete a product        |
| POST   | `/api/customer`    | Admin/Employee | Add new customer        |
| GET    | `/api/customer`    | Admin/Employee | View all customers      |
| POST   | `/api/sale`        | Admin/Employee | Create a new sale       |
| GET    | `/api/sale`        | Admin          | View all sales          |


## 📁 Project Structure

Sale_Report/
├── controllers/ # Request handling logic
├── middleware/ # Auth and role protection middleware
├── models/ # Mongoose schemas
├── routes/ # API route handlers
├── db.js # MongoDB connection
├── index.js # Main server entry
└── .env # Environment variables


---

## ⚙️ Getting Started

### 1. Clone the Repository

git clone https://github.com/Sid9879/Sale_Report.git
cd Sale_Report
npm install
MONGO_URL=your_mongo_connection_uri
JWT_SECRET=your_secret_key
PORT=your_preferred_port (e.g. 8080)
node index.js




