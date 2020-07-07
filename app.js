const {MONGODB_URI, EMAIL } = require("./configs/config");
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var multer = require('multer');
var upload = multer();

const app = express();
// For performing all kinds of operations
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());

// Importing models
const User = require('./models/user');
const Note = require("./models/note");


// Routes
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);
app.get("/", function (req, res) {
    console.log("Request received");
    return res.status(200).json({"ok":"ok"})
})

//Catch 404 errors and forward them to error handelers
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//Error handeler function
app.use((err, req, res, next) => {
    const error = err;
    const status = err.status || 500;
    //respond to clients
  return res.status(status).json({ status: status, message: error.message });
  console.error(err);
})


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(result => {
      console.log('Connected Database');
      app.listen(3000, function() {
        console.log('App listening on port ' + 3000 + '!');
      });
    })
  .catch(err => {
    console.log(err);
  });