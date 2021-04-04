const Customer = require('../../models/Customer')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Product = require('../../models/Product')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// View all products in stock // Retailer, Wholesaler
router.get('/api/:type/stock/:id', (req, res) => {
  try {
    const ownerType = req.params.type
    const userId = req.params.id
    
    const products = Product.find({ owner: userId, ownerType })
    
    res.status(200).send(products)
  } catch (e) {
    
  }
})

module.exports = router



