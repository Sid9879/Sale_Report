const express = require ('express');
const app = express();
const cors = require('cors');
const port = 8090;
const cookieParser = require("cookie-parser");
const allowedOrigin = process.env.CORS_ORIGIN || "https://sale-report.onrender.com"; 

app.use(express.json());
app.use(cors({
    origin:allowedOrigin,
    credentials: true // 🔥 Allow credentials (cookies)
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