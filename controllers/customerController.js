const Customer = require('../models/customerSchema');
const User = require('../models/userSchema')
const validator = require('validator')

const customerRegister = async(req,res)=>{
     const {name,email,phoneNumber,address} = req.body;
     const addedBy = req.user._id
try {
    const user = await User.findById(addedBy);
    if (!user || user.role === 'user') {
      return res.status(403).json({ msg: "Access denied", success: false });
    }
    const existingCustomer = await Customer.findOne({
        $or: [{ email }, { phoneNumber }]
      });
      
      if (existingCustomer) {
        if (existingCustomer.email === email) {
          return res.status(400).json({ msg: "Customer with this email already exists" });
        } else {
          return res.status(400).json({ msg: "Customer with this phone number already exists" });
        }
      }
      
    const register = await Customer.create({
        name,
        email,
        phoneNumber,
        // addedBy,
        address
     })
     res.status(200).json({msg:"Customer Registerd",success:true,register})
} catch (error) {
    res.status(500).json({msg:"internal error",error:error.message,success:false})
}
}

const updateCustomer = async(req,res)=>{
    const userId = req.user._id;
    const customerId = req.params._id; 
     const {address,phoneNumber,email,name} = req.body;
     try {
        const users = await User.findById(userId);
        if (!users || users.role === 'user') {
          return res.status(403).json({ msg: "Access denied", success: false });
        }
        const user = await User.findById(userId);
        if(!user || !user.isAdmin){
            return res.status(401).json({msg:"You are not authorized to update this customer",success:false})
        }
        let updateCustomers = await Customer.findByIdAndUpdate(customerId,{$set:{email,phoneNumber,address,name}},{new:true}) 
        res.status(200).json({msg:"Customer Updated",success:true,updateCustomers});
     } catch (error) {
        res.status(500).json({ msg: "Internal server error", success: false, error:error.message });
     }
}

const deleteCustomer = async(req,res)=>{
    const userId = req.user._id;
    const customerId = req.params._id;
    try {
        const user = await User.findById(userId);
        if (!user || user.role === 'user' || !user.isAdmin) {
            return res.status(403).json({ msg: "Access denied", success: false });
          }
        const deleteCustomers = await Customer.findByIdAndDelete(customerId);
        res.status(200).json({msg:"customer deleted successfully",success:true})
    } catch (error) {
        res.status(500).json({msg:"Internal server error",success:false})
    }
}

const getCustomer = async(req,res)=>{
    const userId = req.user._id
   try {
    const user = await User.findById(userId)
    if(!user || !user.role ==='user'){
         return res.status(401).json({msg:"Access Denied",success:false})
    }
    const getAll = await Customer.find();
    res.status(200).json({msg:"Customer fetched successfully",getAll, success:true})
   } catch (error) {
       res.status(500).json({msg:"internal error",error:error.message, success:false})
   }

}

module.exports = {
    customerRegister,
    updateCustomer,
    deleteCustomer,
    getCustomer
}