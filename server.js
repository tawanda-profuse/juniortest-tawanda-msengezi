'use strict';
require('dotenv').config();

// Importing NPM Packages
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const serverless = require("serverless-http");
const router = express.Router();
//const path = require("path");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require("mongoose");

app.use(express.static('public'));

// Import routes
const indexRouter = require("./routes/index");
const categoryRouter = require('./routes/category');
const productRouter = require("./routes/products");

const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Method Override
app.use(methodOverride('_method'));

// Connect flash
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false })); // Allows us to access all the parameters in the article form inside the article route

// Routes
app.use("/", indexRouter);
app.use("/products", productRouter);

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Express server listening on port " + this.address().port);
});

