const Customer = require('../../models/Customer')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Product = require('../../models/Product')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// View all products which can be bought // Customer, Retailer
router.get('/api/products', (req, res) => {
  try {
    const ownerType = req.query.type
    const category = req.query.category
    
    const products = Product.find({ ownerType, category })
    
    res.status(200).send(products)
  } catch(e) {
    
  }
})

// View product // Customer, Retailer
router.get('/api/:id', (req, res) => {
  try {
    const productId = req.params.id

    const product = Product.findOne({ _id: productId })
    
    res.status(200).send(product)
  } catch(e) {

  }
})

// Order product // Customer, Retailer
router.patch('/api/products/:id', async (req, res) => {
  try {
    const buyerId = req.params.id
    const { sellerId, quantity, name } = req.body

    for (let i = 0; i < quantity; i++) {
      const product = await Product.findOne({ name, owner: sellerId })

      product[owner] = buyerId

      await product.save()
    }

  } catch (e) {
    
  }
})

// Delete product // Retailer, Wholesaler
router.delete()


module.exports = router



