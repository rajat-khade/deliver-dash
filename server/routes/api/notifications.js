const notification = require('../../models/Notification')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Customer = require('../../models/Customer')
const Delivery = require('../../models/Delivery')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/api/:type/notification/:id', async(req, res) => {
    const owner = req.params.id
    const ownerType = req.params.type
  
    
    
    // res.send(cartItems)
  })

