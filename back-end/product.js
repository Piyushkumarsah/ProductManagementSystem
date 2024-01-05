const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    company: String,
    quantity: Number,
    userId : String
},{timestamps : true})
const Product = mongoose.model('product', productSchema); 

module.exports = Product;
