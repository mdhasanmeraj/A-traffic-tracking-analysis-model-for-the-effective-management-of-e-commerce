// server.js  
const express = require('express');  
const app = express();  
const MongoClient = require('mongodb').MongoClient;  
const url = 'MONGO_URL=mongodb+srv://mdhasanmeraj8:Mdhasan123@myprojectcluster.ehcwr.mongodb.net/Myproject?retryWrites=true&w=majority&appName=MyProjectCluster';  
const dbName = 'yourDatabaseName';  
  
MongoClient.connect(url, function(err, client) {  
  if (err) {  
   console.log(err);  
  } else {  
   console.log('Connected to MongoDB');  
   const db = client.db(dbName);  
  
   app.get('/holdings', (req, res) => {  
    db.collection('holdings').find().toArray((err, holdings) => {  
      if (err) {  
       console.log(err);  
      } else {  
       res.json(holdings);  
      }  
    });  
   });  
  
   app.get('/positions', (req, res) => {  
    db.collection('positions').find().toArray((err, positions) => {  
      if (err) {  
       console.log(err);  
      } else {  
       res.json(positions);  
      }  
    });  
   });  
  
   app.get('/orders', (req, res) => {  
    db.collection('orders').find().toArray((err, orders) => {  
      if (err) {  
       console.log(err);  
      } else {  
       res.json(orders);  
      }  
    });  
   });  
  
   app.get('/users', (req, res) => {  
    db.collection('users').find().toArray((err, users) => {  
      if (err) {  
       console.log(err);  
    } else {  
        res.json(users);  
      }  
    });  
   });  
  }  
});  
  
app.listen(3000, () => {  
  console.log('Server listening on port 3000');  
});
