const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
      type: String,
      unique: true,
      required: true
  },
  name: {
      type: String, 
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  color: {
    type: String,
    default: 'white'
  },
  category: {
    type: String,
    required: true, 
    ref: 'Category'
  }
});

module.exports = mongoose.model('Product', productSchema);