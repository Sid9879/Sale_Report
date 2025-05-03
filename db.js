// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userSchema"); 
require('dotenv').config();


// const createAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     const existingAdmin = await User.findOne({ email: "inghsiddharth1438@gmail.com" });
//     if (existingAdmin) {
//       console.log("Admin already exists");
//       return;
//     }

//     const hashedPassword = await bcrypt.hash("singhsid1438", 8);

//     const admin = await User.create({
//       name: "Siddharth Singh",
//       email: "singhsiddharth1438@gmail.com",
//       password: hashedPassword,
//       phoneNumber: 9838343494,
//       address: "Bargadawa Mahrajganj UP INDIA",
//       isAdmin: true,
//       role: "Admin",
//     });

//     console.log("Admin created successfully:", admin.email);
//   } catch (err) {
//     console.error("Error creating admin:", err.message);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// createAdmin();
// module.exports = createAdmin

const database = async () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));
};
module.exports = database
