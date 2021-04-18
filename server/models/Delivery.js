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
  available: {
    default: true,
    type: Boolean
  }
})

const Delivery = mongoose.model('delivery', DeliverySchema)

module.exports = Delivery