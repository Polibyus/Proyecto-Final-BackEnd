require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://JuanchiFP:juanchi123@cluster0.jaeglry.mongodb.net/?retryWrites=true&w=majority',
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 300000,
  PORT: process.env.PORT || '3000'
}
