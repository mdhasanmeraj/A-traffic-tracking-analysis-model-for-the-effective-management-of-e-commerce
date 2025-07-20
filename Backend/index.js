require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");
const { HoldingsModel } = require("./model/HoldingsModel");
const authRoutes = require('./routes/authRoutes')


const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const user = require("./model/user");




const PORT = process.env.PORT || 3004;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const sessionOptions = {
  
  secret: 'a94f54a8-3456-4f34-9f34-345678901234',
  resave: false,
  saveUninitialized: true
};

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.post("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: req.body.email,
//     age: req.body.age,
//     country: req.body.country,
//     username: req.body.username

//   });
//   demouser.save();

//   app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//       email: "Mdhasan2@gmail.com",
//       age: 20,
//       country: "India",
//       username: "HasanMeraj"
  
//     });
    

//   let registereduser = await User.register(fakeUser, "demouser");
//   res.send(registereduser);
// });
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan2@gmail.com",
//     age: 20,
//     country: "India",
//     username: "HasanMeraj"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan22@gmail.com",
//     age: 39,
//     country: "India",
//     username: "HasanMeraj3"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });
app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "Mdhasan24@gmail.com",
    age: 16,
    country: "India",
    username: "HasanMeraj6"

  });
  

let registereduser = await User.register(fakeUser, "demouser");
res.send(registereduser);
});
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan24@gmail.com",
//     age: 30,
//     country: "India",
//     username: "HasanMeraj2"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan20@gmail.com",
//     age: 20,
//     country: "India",
//     username: "HasanMeraj1"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan920@gmail.com",
//     age: 20,
//     country: "AFG",
//     username: "HasanMeraj5"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan2g0@gmail.com",
//     age: 80,
//     country: "India",
//     username: "HasanMeraj7"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan2g0@gmail.com",
//     age: 70,
//     country: "India",
//     username: "HasanMeraj8"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan20f@gmail.com",
//     age: 60,
//     country: "USA",
//     username: "HasanMeraj9"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan209@gmail.com",
//     age: 50,
//     country: "USA",
//     username: "HasanMeraj0"

//   });
  

// let registereduser = await User.register(fakeUser, "demouser");
// res.send(registereduser);
// });

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan9420@gmail.com",
//     age: 40,
//     country: "AFG",
//     username: "HasanMeraj5dc"

//   });

//   let registereduser = await User.register(fakeUser, "demouser");
//   res.send(registereduser);
//   });

  
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan90@gmail.com",
//     age: 50,
//     country: "AFG",
//     username: "HasanMerajdf5"

//   });

//   let registereduser = await User.register(fakeUser, "demouser");
//   res.send(registereduser);
//   });

  
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "Mdhasan92@gmail.com",
//     age: 25,
//     country: "AFG",
//     username: "HasanMerajdsf"

//   });

//   let registereduser = await User.register(fakeUser, "demouser");
//   res.send(registereduser);
//   });

// app.get("/Signup", async (req, res) => {
//   let Signup = await user.find({});
//   res.json(Signup);
// });

// app.post("/Signup", async (req, res) => {
//   let {username, email, age, country, password } = req.body;
//   const newUser = new User({ email, username });
//   constregisteredUser = await User.register(newUser, password);
//   console.log(registeredUser);
//   req.flash("success","Welcome to the MerajStocks!");
//   res.redirect("/Home");
// });

//app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});


