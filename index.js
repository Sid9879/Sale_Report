const express = require ('express');
const app = express();
const cors = require('cors');
const port = 8090;
const cookieParser = require("cookie-parser");
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend-url.vercel.app'
];

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const db = require('./db');
db()
app.use(cookieParser()); 



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