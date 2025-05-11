const express = require('express');
const checkToken = require('../middleware/checktoken');
const {addBilling, getAlLBill, deleteProducts, updateBilling} = require('../controllers/billingController');
const router = express.Router();

router.post('/addbillings',checkToken,addBilling);
router.put('/updatebill/:_id',checkToken,updateBilling);
router.delete('/deletebill/:_id',checkToken,deleteProducts);
router.get('/getAll',checkToken,getAlLBill);

module.exports = router