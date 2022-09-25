require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || '',
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 300000,
  PORT: process.env.PORT || '3000',
  EMAIL_TEST: process.env.EMAIL_TEST || ''
}
