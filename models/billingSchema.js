const mongoose = require('mongoose')
const NewBilling = new mongoose.Schema({
  
    companyName:{
        type:String,
        required:true,
        minlength:[3,'Title must be at least 4 characters long']

    },

    title:{
        type:String,
        required:true,
        minlength:[3,'Title must be at least 4 characters long']
    },

    invoiceNo:{
        type:String,
        required:true,
    },
    invoiceDate:{
        type:Date,
        required:true
    },
    dueDate:{
        type:Date,
    },
    productDescription:{
        type:String,
        required:true
    },
    hsnCode:{
        type:String,
    },
    oty:{
        type:Number,
        required:true
    },
    packageSize:{
        type:String,
    },
    unitPrice:{
        type:Number,
        required:true
    },
    gst:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    

},{timestamps:true})

module.exports = mongoose.model('billing',NewBilling);