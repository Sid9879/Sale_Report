const express = require('express');
const checkToken = require('../middleware/checktoken');
const {addBilling, getAlLBill, deleteProducts, updateBilling} = require('../controllers/billingController');
const router = express.Router();

router.post('/addbillings',checkToken,addBilling);
router.put('/updatebill',checkToken,updateBilling);
router.delete('/deletebill',checkToken,deleteProducts);
router.get('/getAll',checkToken,getAlLBill);

module.exports = router