const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/globals');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGO_URI, advancedOptions, () => console.log('Connected'))

const orderCollection = 'ordenes';

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios'},
    cart: { type: Object, required: true },
    domicilio: { type: String, required: true },
    metodo: { type: String, required: true }
})

module.exports = mongoose.model(orderCollection, orderSchema)