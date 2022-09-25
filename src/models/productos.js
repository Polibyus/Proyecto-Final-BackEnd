const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/globals');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGO_URI, advancedOptions, () => console.log('Connected'))

const productsCollection = 'productos';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true, max: 1000 },
    category: { type: String, required: true, max: 100 }
})

module.exports = mongoose.model(productsCollection, ProductSchema)