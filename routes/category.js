const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const products = await Product.find(searchOptions);
    res.render('authors/index', { 
      authors: authors,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// New Author Route
router.get('/new', (req, res) => {
  res.render('categories/new', { category: new Category() });
});

// Create Category Route
router.post('/', async (req, res) => {
  const category = new Category({
    category: req.body.category
  });
  try {
    await category.save();
    res.redirect('/');
  } catch (e){
    console.log(e);
  }
});

// Show Categories Route
router.get('/:id', async (req, res) => {
  try { 
    const category = await Category.findById(req.params.id);
    const products = await Product.find({ category: category.id }).limit(6).exec();
    res.render('categories/show', {
      category: category,
      itemsByCategory: category
    });
  } catch(e) {
    console.log(e);
    res.redirect('/');
  }
});

// Edit Author Route
router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render('authors/edit', { author: author });
  } catch {
    res.redirect('/authors');
  }
});

// Edit Author Route
router.put('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    if (author == null) {
      res.redirect('/');
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating author details'
      })
    }
  }
})

// Delete Author Route
router.delete('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect('/authors');
  } catch {
    if (author == null) {
      res.redirect('/');
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;