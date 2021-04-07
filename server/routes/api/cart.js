const Customer = require('../../models/Customer')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Product = require('../../models/Product')
const Cart = require('../../models/Cart')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// View All Items in Cart
router.get('/api/:type/cart/:id', async(req, res) => {
  const type = req.params.type
  const buyerId = req.params.id

  const cartItems = await Cart.find({ owner: buyerId, type })

  res.send(cartItems)
})

// Add Cart Item // Retailer, Wholesaler
router.post('/api/:type/cart/:id', async (req, res) => {
  const type = req.params.type
  const buyerId = req.params.id

  const { product, quantity } = req.body

  const cartItem = new Cart({ owner: buyerId, type, product, quantity })
    
  await cartItem.save()

  res.send(cartItem)
})

// Update Cart Item Quantity // Retailer, Wholesaler
router.patch('api/:type/cart/:id', async (req, res) => {
  const type = req.params.type
  const buyerId = req.params.id

  const { product, quantity } = req.body

  const cartItem = await Cart.findOne({ owner: buyerId, type, product })
  
  cartItem['quantity'] = quantity
  
  await cartItem.save()

  res.send(cartItem)
})

// Delete Item from Cart // Retailer, Wholesaler
router.delete('/api/:type/cart/:id', async(req, res) => {
  const type = req.params.type
  const buyerId = req.params.id

  const { product } = req.body

  const cartItem = await Cart.findOneAndDelete({ owner: buyerId, type, product })

  res.send(cartItem)
})


module.exports = router



