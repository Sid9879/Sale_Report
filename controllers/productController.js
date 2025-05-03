const Product = require('../models/productSchema');
const User = require('../models/userSchema')

const addProduct = async (req, res) => {
  const { title, price, size, quantity, category, composition, discount } = req.body;
  const adminId = req.user._id;

  try {
    const admin = await User.findById(adminId);
    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ msg: "You are not authorized to add anything", success: false });
    }

    const existingItem = await Product.findOne({ title, size });

    if (existingItem) {
      // Ensure existingProducts array is initialized
      if (!Array.isArray(existingItem.existingProducts)) {
        existingItem.existingProducts = [];
      }

      const newEntry = {
        quantity,
        date: new Date(),
      };

      // Push the new stock entry
      existingItem.existingProducts.push(newEntry);

      // Update main quantity
      existingItem.quantity += quantity;

      // Save updated product
      await existingItem.save();

      return res.status(200).json({
        msg: "Product already exists, updated stock info",
        success: true,
        updatedItem: existingItem
      });
    }

    // Create new product if it doesn't exist
    const item = await Product.create({
      title,
      price,
      size,
      quantity,
      category,
      composition,
      discount,
      existingProducts: [
        {
          quantity,
          date: new Date(),
        }
      ]
    });

    res.status(200).json({
      msg: "Product added successfully",
      success: true,
      item
    });

  } catch (error) {
    res.status(500).json({
      msg: "Internal error",
      success: false,
      error: error.message
    });
  }
};





const getAllProduct = async(req,res)=>{
    try{
        const getAll = await Product.find();
        res.status(200).json({msg:"Product fetched successfully",success:true, getAll})
  }
    catch(error){
        res.status(500).json({msg:"Server Error",success:false, error:error.message})
    }

}
const updateProduct = async (req,res)=>{
       const {title,size,quantity,price,composition,discount,category} = req.body;
       const productId = req.params._id;
       const adminId = req.user._id;
      try{
        const admin = await User.findById(adminId);
        if(!admin || !admin.isAdmin){
         return res.status(403).json({msg:"You are not authorized to add any thing",success:false})
        }
        const updateItem = await Product.findByIdAndUpdate(productId,{$set:{title,size,quantity,price,composition,discount,category}},{new:true})
        res.status(200).json({msg:"Updated Successfully",success:true,updateItem})
      } catch(error){
        res.status(500).json({msg:"Server error", success:false, error:error.message})
      }

}
const deleteProduct = async (req,res)=>{
     const productId = req.params._id;
     const adminId = req.user._id;
  try {
    const admin = await User.findById(adminId);
    if(!admin || !admin.isAdmin){
       return res.status(403).json({msg:"You are not authorized to add any thing",success:false})
    }
    else{
       const item = await Product.findByIdAndDelete(productId)
       res.status(200).json({msg:"Deleted Successfully",success:true});
    }
  } catch (error) {
     res.status(500).json({msg:"Internal Error",success:false,error:error.message})
  }
    
}



module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct

}