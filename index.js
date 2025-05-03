const express = require('express');
const app = express();
const cors = require('cors');
const port = 8090;
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://sale-report.onrender.com', 
    ];
console.log("Origin received:", origin);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// DB setup
const db = require('./db');
db();

// Routers
const customerRouter = require('./routes/customerRoutes');
app.use('/customer', customerRouter);

const userRouter = require('./routes/userRoutes');
app.use('/user', userRouter);

const productRouter = require('./routes/productController');
app.use('/product', productRouter);

const salesRouter = require('./routes/salesRoutes');
app.use('/sales', salesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
