const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    composition:{
        type:String
    },
    quantity:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:['Seed','Fertilizer','Pesticides'],
        required:true
    },
    discount:{
        type:Number
    },
},{timestamps:true})

module.exports = mongoose.model("product",ProductSchema);