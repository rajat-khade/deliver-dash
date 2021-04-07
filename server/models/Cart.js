const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId
  },
  ownerType: {
    type: String
  },
  product: {
    type: String
  },
  quantity: {
    type: Number
  }
})