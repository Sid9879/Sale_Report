const Sale = require('../models/salesSchema');
const Product = require('../models/productSchema');
const customer = require('../models/customerSchema')

const createSale = async (req, res) => {
  let  quantity = req.body.quantity;
  quantity = parseInt(quantity) || 1;
  const productId = req.params.productId;
  const addedBy = req.user._id;
   const customerId = req.params.customerId
   const today = new Date();
today.setHours(0, 0, 0, 0);

  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    if (existingProduct.quantity < quantity) {
      return res.status(400).json({ msg: 'Insufficient stock available' });
    }

    existingProduct.quantity -= quantity;
    await existingProduct.save();

    const productDetails = {
      productId: existingProduct._id,
      title: existingProduct.title,
      size: existingProduct.size,
      price: existingProduct.price,
      quantity,
      date: new Date() 
    };

    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    let existingSale = await Sale.findOne({ customerId, date: today }).populate('customerId')
    .populate({
      path: 'addedBy',
      select: 'name'
    });

    if (existingSale) {
     
      const existingProductIndex = existingSale.products.findIndex(
        (p) => String(p.productId) === String(productId)
      );

      if (existingProductIndex !== -1) {
        
        existingSale.products[existingProductIndex].quantity += quantity;
      } else {
       
        existingSale.products.push(productDetails);
      }

     
      existingSale.totalAmount = existingSale.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      await existingSale.save();
      return res.status(200).json({ msg: 'Sale updated', sale: existingSale , success:true});

    } else {
     
      const newSale = new Sale({
        customerId,
        products: [productDetails],
        totalAmount: quantity * existingProduct.price,
        addedBy,
        date: today
      });
      

      await newSale.save();
      return res.status(201).json({ msg: 'New sale created', sale: newSale , success:true});
    }

  } catch (error) {
    res.status(500).json({ msg: 'Error', error: error.message });
  }
};


const reduceQuantity = async (req, res) => {
  let  quantity = req.body.quantity;
  quantity = parseInt(quantity) || 1;
    const saleId = req.params.saleId;
    const productId = req.params.productId;
    try {
      
      const sale = await Sale.findById(saleId).populate('customerId').populate({
        path:'addedBy',
        select:'name'
      });
      if (!sale) {
        return res.status(404).json({ msg: 'Sale not found' });
      }
      
      const productInSale = sale.products.find((product) => product.productId.toString() === productId);
      if (!productInSale) {
        return res.status(404).json({ msg: 'Product not found in the sale' });
      }
      
      if (productInSale.quantity < quantity) {
        return res.status(400).json({ msg: 'Cannot reduce quantity more than available' });
      }
     
      productInSale.quantity -= quantity;

      if (productInSale.quantity === 0) {
        sale.products = sale.products.filter((product) => product.productId.toString() !== productId);
    }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found in the product collection'});
      }
      
      product.quantity += quantity; 
      await product.save();
      sale.totalAmount = sale.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      await sale.save();
      res.status(200).json({ msg: 'Sale updated', sale,success:true });
    } catch (error) {
      res.status(500).json({ msg: 'Error', error: error.message });
    }
  };

  const deleteTodaySaleProducts = async (req, res) => {
    const  customerId  = req.params.customerId
  
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const deletedSale = await Sale.findOneAndDelete({ customerId, date: today });
  
      if (!deletedSale) {
        return res.status(404).json({ msg: 'No sale found for this customer today' });
      }
  
      for (const item of deletedSale.products) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { quantity: item.quantity }
        });
      }
  
      res.status(200).json({ msg: 'Today’s sale deleted successfully', success: true });
    } catch (err) {
      res.status(500).json({ msg: 'Error deleting sale', error: err.message });
    }
  };
  
  
  const getTodayProducts = async (req, res) => {
    const customerId = req.params.customerId;
  
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const sale = await Sale.findOne({ customerId, date: today })
        .populate('customerId')
        .populate({ path: 'addedBy', select: 'name' });
  
      if (!sale) {
        return res.status(404).json({ msg: 'No sale found for this customer today' });
      }
  
      const todayTotal = sale.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      res.status(200).json({
        msg: 'Today’s products fetched successfully',
        saleId: sale._id,
        products: sale.products,
        totalAmount: todayTotal,
        success: true
      });
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching today’s products', error: err.message });
    }
  };
  
  

  const getAllTimeSales = async (req, res) => {
    try {
     
      const sales = await Sale.find();

      let totalAllTimeSales = 0;
      sales.forEach((sale) => {
        sale.products.forEach((product) => {
          totalAllTimeSales += product.price * product.quantity;
        });
      });
  
      res.status(200).json({
        msg: "All-time sales fetched successfully",
        totalAmount: totalAllTimeSales,
        success: true,
      });
    } catch (err) {
      res.status(500).json({ msg: "Error fetching all-time sales", error: err.message });
    }
  };

  const getTodaySales = async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const sales = await Sale.find({
        "products.date": { $gte: startOfDay, $lte: endOfDay },
      }).populate("customerId");
  
      let totalTodaySales = 0;
      sales.forEach((sale) => {
        sale.products.forEach((product) => {
          const productDate = new Date(product.date);
          if (productDate >= startOfDay && productDate <= endOfDay) {
            totalTodaySales += product.price * product.quantity;
          }
        });
      });
  
      res.status(200).json({
        msg: "Today's sales fetched successfully",
        totalAmount: totalTodaySales,
        success: true,
      });
    } catch (err) {
      res.status(500).json({ msg: "Error fetching today's sales", error: err.message });
    }
  };
  

module.exports = {
    createSale,
    reduceQuantity,
    deleteTodaySaleProducts,
    getTodayProducts,
    getAllTimeSales,
    getTodaySales

}

