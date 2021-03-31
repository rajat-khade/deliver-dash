const mongoose = require('mongoose')

const RetailerScehma = new mongoose.Schema({
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

const Retailer = mongoose.model('retailer', RetailerScehma)

module.exports = Retailer