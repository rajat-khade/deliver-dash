const mongoose = require('mongoose')

const WholesalerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  } 
})

const Wholesaler = mongoose.model('wholesaler', WholesalerSchema)

module.exports = Wholesaler