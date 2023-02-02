const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');

// New Product Route
router.get('/add-product', async (req, res) => { 
  renderNewPage(res, new Product());
});

router.post('/', async (req, res) => {
  const product = new Product({
    sku: req.body.sku,
    name: req.body.name,
    price: req.body.price,
    color: req.body.color,
    category: req.body.category
  });

  try {
    await product.save();
    res.redirect(`/`);
  } catch (e){
    console.log(e);
    renderNewPage(res, product, true);
  }
});

router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

async function renderNewPage(res, product, hasError = false) {
  renderFormPage(res, product, 'add-product', hasError);
}

async function renderEditPage(res, product, hasError = false) {
  renderFormPage(res, product, 'edit', hasError);
}

async function renderFormPage(res, product, form, hasError = false) {
  try {
    const categories = await Category.find({});
    const params = {
      categories: categories,
      product: product
    };
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error updating product details';
      } 
      else {
        params.errorMessage = 'Cannot create product';
      }
    }
    res.render(`products/add-product`, params);
  } catch(e) {
    console.log(e);
    res.redirect('/add-product');
  }
}

module.exports = router;