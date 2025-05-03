const express = require ('express');
const app = express();
const cors = require('cors');
const port = 8090;
const cookieParser = require("cookie-parser");



const allowedOrigins = [
  'http://localhost:5173',
  'https://sale-report-frontend.vercel.app', // ✅ Your actual frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked CORS origin:", origin); // Debug log
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// ✅ Must add this to handle preflight
// app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 

const db = require('./db');
db()
const customerRouter = require('./routes/customerRoutes');
app.use('/customer',customerRouter);
const Userrouter = require('./routes/userRoutes');
app.use('/user',Userrouter);
const productRouter = require('./routes/productController');
app.use('/product',productRouter)
const salesRouter = require('./routes/salesRoutes');
app.use('/sales', salesRouter);

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})