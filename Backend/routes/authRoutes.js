// const express = require("express");
// const router = express.Router();
// const User = require('../model/user');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const authController = require('../controllers/authController');

// passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//   User.findOne({ email }, (err, user) => {
//     if (err) return done(err);
//     if (!user) return done(null, false, { message: 'Invalid email or password' });
//     user.comparePassword(password, (err, isMatch) => {
//       if (err) return done(err);
//       if (!isMatch) return done(null, false, { message: 'Invalid email or password' });
//       return done(null, user);
//     });
//   });
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });



// // Route for user signup
// router.post('/signup', authController.signup);

// // Route for user login
// router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/dashboard');
// });

// // Route for user logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/login');
// });
// module.exports = router;