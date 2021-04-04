const Customer = require('../../models/Customer')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Product = require('../../models/Product')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Add product to cart // Retailer, Wholesaler
router.post('/api/cart', (req, res) => {
})

// Update product // Retailer, Wholesaler
router.patch('api/cart')

// Delete product // Retailer, Wholesaler
router.delete('/api/cart')


module.exports = router



