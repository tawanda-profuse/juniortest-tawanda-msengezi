const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

// Home Page
router.get('/', async (req, res) => {
  let products;
  try {
    products = await Product.find().sort({ name: 'asc' }).limit(10).exec();
  } catch {
    products = [];
  }
  res.render('products/index', {
    products: products
  });
});

// About Route
router.get("/about", async (req, res) => {  
  res.render("products/about");
});

module.exports = router;



