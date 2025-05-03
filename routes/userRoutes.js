const express = require('express');
const router =  express.Router();
const { registerUser, loginUser, updateEmployee, deleteEmployee, getEmployee, logoutUser, getOneEmployee, checkAuth } = require("../controllers/userController");
const checktoken = require ('../middleware/checktoken');


router.post('/register',checktoken,registerUser);
router.post("/login",loginUser);
router.get("/getall",checktoken,getEmployee)
router.put("/updateemployee",checktoken,updateEmployee);
router.delete("/deleteemployee/:_id",checktoken,deleteEmployee);
router.get("/logout",logoutUser);
router.get("/getProfile",checktoken,getOneEmployee);
router.get('/check', checktoken, checkAuth);


module.exports = router