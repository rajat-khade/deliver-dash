const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
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

const Customer = mongoose.model('customer', CustomerSchema)

module.exports = Customer