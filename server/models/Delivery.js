const mongoose = require('mongoose')

const DeliverySchema = new mongoose.Schema({
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
  },
  amountPayable: {
    type: Number,
  },
  status: {
    default: false,
    type: Boolean
  }
})

const Delivery = mongoose.model('delivery', DeliverySchema)

module.exports = Delivery