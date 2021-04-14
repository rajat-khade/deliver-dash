const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId
  },
  ownerType: {
    type: String
  },
  productId: {
    type: mongoose.Types.ObjectId
  },
  quantity: {
    type: Number
  }
})

const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart