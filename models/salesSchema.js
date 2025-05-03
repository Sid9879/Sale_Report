const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
 
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
      },
      title: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  date: {
    type: Date,
    default: () => new Date(new Date().setHours(0, 0, 0, 0)) // This saves only the DATE (not time)
  }
  
});

module.exports = mongoose.model("Sale", saleItemSchema);
