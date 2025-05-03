const mongoose = require('mongoose');
const  User = require ('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SCECRET = process.env.JWT_SCECRET

const registerUser = async(req,res)=>{
  
    try {
      if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ msg: "Access denied. Admins only.", success: false });
      }
        let {name,email,password,isAdmin,address,phoneNumber,role} = req.body;
        let existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"email already registered",success:false})
        }
        let existingPhone = await User.findOne({phoneNumber})
        if (existingPhone){
          return res.status(400).json({msg:"PhoneNumber already registered"})
        }
        const hashedpassword = await bcrypt.hash(password,8);
        const user = await User.create({
            name,
            email,
            password:hashedpassword,
            address,
            phoneNumber,
            isAdmin:false,
            role
        })
        res.status(200).json({msg:"registered successfully",success:true,user})
    } catch (error) {
        res.status(500).json({msg:"Internal server error",error:error.message})
        
    }
}

const loginUser = async(req,res)=>{
    try{
        let {email,password} = req.body;
        let user = await User.findOne({email});
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required", success: false });
          }
        if(!user){
            return res.status(400).json({msg:"Invalid email",success:false})
        }
        let matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(400).json({msg:"Invalid password",success:false});
        }
        let token = jwt.sign({_id:user._id,email:user.email,isAdmin:user.isAdmin},process.env.JWT_SCECRET,{expiresIn:"1hr"})
        res.cookie("token", token, {
            httpOnly: true, // prevents JS access on client
            secure: process.env.NODE_ENV === "production", // use HTTPS in production
            sameSite: "Strict", // protects against CSRF
            maxAge: 3600000, // 1 hour in milliseconds
            // maxAge: 60*1000, 
          });
        res.status(200).json({msg:"logged in successfully",success:true,token, user: {
            isAdmin: user.isAdmin,
            name: user.name,
            phoneNumber: user.phoneNumber,
            email:user.email,
            address:user.address

          }})
    } catch(error){
         res.status(500).json({msg:"internal error",error:error.message,success:false})
    }
}

// const updateEmployee = async(req,res)=>{
//     const {address,password,phoneNumber,email,role} = req.body;
//     const adminId = req.user._id
//    try {
//     const admin = await User.findById(adminId)
//     if(!admin||!admin.isAdmin){
//         return res.status(400).json({msg:"You are not authorized to make changes",success:false})
//     }
//     const employee = await User.findOne({email})
//     if(!employee){
//         return res.status(400).json({msg:"Invalid email",success:false})
//     }
//     if(password){
//     var hashedpassword = await bcrypt.hash(password,8);
//     }
//     const Updateemployee = await User.findByIdAndUpdate(employee._id,{$set:{address,password:hashedpassword,phoneNumber,role}},{new:true})
//     res.status(200).json({msg:"employee updated successfully",success:true,Updateemployee})
//    } catch (error) {
//     res.status(500).json({msg:"internal server error",success:false, error:error.message})
//    }
// }

const updateEmployee = async (req, res) => {
    const { address, password, phoneNumber, email, role } = req.body;
    const adminId = req.user._id;
  
    try {
      const admin = await User.findById(adminId);
      if (!admin || !admin.isAdmin) {
        return res.status(400).json({
          msg: "You are not authorized to make changes",
          success: false
        });
      }
  
      const employee = await User.findOne({ email });
      if (!employee) {
        return res.status(400).json({
          msg: "Invalid email",
          success: false
        });
      }
  
      const updateFields = {};
      if (address) updateFields.address = address;
      if (phoneNumber) updateFields.phoneNumber = phoneNumber;
      if (role) updateFields.role = role;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 8);
        updateFields.password = hashedPassword;
      }
  
      const updatedEmployee = await User.findByIdAndUpdate(
        employee._id,
        { $set: updateFields },
        { new: true }
      );
  
      return res.status(200).json({
        msg: "Employee updated successfully",
        success: true,
        employee: updatedEmployee
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Internal server error",
        success: false,
        error: error.message
      });
    }
  };
  

const getEmployee = async(req,res)=>{
  const adminId = req.user._id
   try{
   const admin = await User.findById(adminId);
   if(!admin ||!admin?.isAdmin){
    return res.status(401).json({msg:"Your are not admin",success:false})
   }
    const getAll = await User.find()
    res.status(200).json({msg:"employees retrieved successfully",success:true,employees:getAll})
   } catch(error){
           res.status(500).json({msg:"error in getting employee",error:error.message})
   }
    
}

const deleteEmployee = async (req, res) => {
    const adminId = req.user._id; 
    const employeeId = req.params._id

    try {
        const adminUser = await User.findById(adminId);
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ msg: "Only admins can delete employees" });
        }

        // Find the employee by email
        const employee =  await User.findByIdAndDelete(employeeId);
        if (employee.isAdmin) {
            return res.status(403).json({ msg: "Cannot delete an admin account" });
        }
        return res.status(200).json({ msg: "Employee deleted successfully" });

    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};

const logoutUser = async(req,res)=>{
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None", // or 'None' if using cross-origin
    secure: true, // if using HTTPS
  });
  res.status(200).json({ msg: "Logged out", success: true });
}

const getOneEmployee = async(req,res)=>{
  const userId = req.user._id;
  try {
    const getProfile = await User.findById(userId).select('-password');
    res.status(200).json({msg:"Profile Fetched",getProfile,success:true})
  } catch (error) {
    res.status(500).json({msg:"Internal Error",success:false,error:error.message})
  }
}

// GET /api/auth/check
const checkAuth = (req, res) => {
  if (req.user) {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
};


module.exports  = {
    registerUser,
    loginUser,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    logoutUser,
    getOneEmployee,
    checkAuth
    
}