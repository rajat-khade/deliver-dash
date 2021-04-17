const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  from : {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: true
  },
  delivery: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order