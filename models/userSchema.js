const mongoose = require('mongoose');
const validator = require('validator')


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
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
    password:{
        type:String,
        required: [true, 'Password is required']

    },

    role: {
        type: String,
        enum: ['user', 'Employee','Admin'], // allowed roles
        default: 'user'
    },

   isAdmin:{
    type:Boolean,
    default:false,
   },
   address:{
    type:String,
    required: [true, 'Address is required']
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
})

module.exports = mongoose.model("user",UserSchema)