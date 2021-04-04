const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema ({
  owner :{
    type: mongoose.Types.ObjectId
  },
  ownerType: {
    type: String
  },
  name: {
    type: String,
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String
  }
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product