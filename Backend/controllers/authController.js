// const express = require('express');
// const router = express.Router();
// const User = require('../model/user');
// const bcrypt = require('bcrypt');

// // Signup Controller
// exports.signup = async (req, res) => {
//   const { name, email, age, country,  password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser  = await User.findOne({ email });
//     if (existingUser ) {
//       return res.status(400).json({ message: 'User  already exists' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     req.login(user, (err) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error logging in user' });
//         }
//         return res.redirect('/home'); // Redirect to home page
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating user' });
//     }
//   };