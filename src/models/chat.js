const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/globals');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGO_URI, advancedOptions, () => console.log('Connected'))

const chatCollection = 'mensajes';

const chatSchema = new mongoose.Schema({
    nick: {type: String, required: true, max: 100},
    mensaje: {type: String, required: true, max: 1000}
})

module.exports = mongoose.model(chatCollection, chatSchema)