const mongoose = require ('mongoose');
const validator = require('validator')
const CustomeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: [3, 'Name must be at least 4 characters long'],  // Validation for minimum length
    maxlength: [50, 'Name must be less than 50 characters long']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
        lowercase:true,
        trim:true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: (props) => `${props.value} is not a valid email address!`,
          },
    },

     phoneNumber:{
      type:String,
      trim:true,
      require:true,
      unique:true,
      minlenght:10,
      maxlength:10,
      validate: {
        validator: (number) => /^\d{10}$/.test(number), // Validates 10-digit phone numbers
        message: 'Phone number must contain only digits and be 10 digits long',
      },
    },
      address:{
        type: String,
        require:true,
        minlength: [20, 'Address must be contain with district and state '],  // Validation for minimum length
    maxlength: [100, 'Address must be less than 50 characters long'],
    match: [/(\d{6})/, 'Address must contain a 6-digit pincode'],
      }
},{timestamps:true})

module.exports = mongoose.model('customer',CustomeSchema);