const express = require('express');
const checkToken = require('../middleware/checktoken');
const {addBilling, getAlLBill, deleteProducts, updateBilling} = require('../controllers/billingController');
const router = express.Router();

router.post('/addbillings',checkToken,addBilling);
router.post('/updatebill',checkToken,updateBilling);
router.post('/deletebill',checkToken,deleteProducts);
router.post('/getAll',checkToken,getAlLBill);

module.exports = router