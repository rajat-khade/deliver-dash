const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  delivered: {
    type: Boolean,
  },
  from : {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  fromId : {
    type: mongoose.Types.ObjectId,
    required: true
  },
  toId : {
    type: mongoose.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  deliveryGuyId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  transaction : {
    type : Number,
    required: true
  }
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order