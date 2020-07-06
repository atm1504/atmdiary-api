const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var config = require('./config.json');
const app = express();
app.use(express.json());

// Importing models
const User = require('./models/user');
const Note = require("./models/note");

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);
app.get("/", function (req, res) {
    console.log("Request received");
    return res.status(200).json({"ok":"ok"})
})


mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(result => {
      console.log('Connected Database');
      app.listen(3000, function() {
        console.log('App listening on port ' + 3000 + '!');
      });
    })
    .catch(err => {
      console.log(err);

    });