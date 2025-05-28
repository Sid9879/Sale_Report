const express = require('express');
const router = express.Router();
const  {createSale, reduceQuantity, deleteSale, getTodayProducts, getAllTimeSales, getTodaySales, deleteTodaySaleProducts}  = require('../controllers/salesController');
const checktoken = require('../middleware/checktoken');

router.post('/create/:productId/:customerId',checktoken,createSale)
router.put('/reduce/:saleId/:productId', checktoken, reduceQuantity);
router.delete('/saleItem/:customerId', checktoken,deleteTodaySaleProducts);
router.get('/sale/today/:customerId',checktoken, getTodayProducts);
router.get('/saletoday' , getTodaySales);
router.get('/saleAlltimes' ,getAllTimeSales);
router.get('/saleTodayGet' ,checktoken,getAllTimeSales);


module.exports = router;