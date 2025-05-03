const express = require('express');
const { customerRegister, updateCustomer, deleteCustomer, getCustomer} = require('../controllers/customerController');
const checktoken = require('../middleware/checktoken')
const router = express.Router();

router.post('/registerCustomer',checktoken,customerRegister);
router.put('/customerUp/:_id',checktoken,updateCustomer);
router.delete('/customerDlt/:_id',checktoken,deleteCustomer);
router.get('/getAllCustomer',checktoken,getCustomer);

module.exports = router
