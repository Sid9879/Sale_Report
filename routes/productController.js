const express = require('express');
const checkToken = require('../middleware/checktoken');
const { addProduct, updateProduct, deleteProduct, getAllProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/addItem',checkToken,addProduct);
router.get('/getAllItem',checkToken,getAllProduct);
router.put('/updateItem/:_id',checkToken,updateProduct);
router.delete('/deleteItem/:_id',checkToken,deleteProduct);

module.exports = router