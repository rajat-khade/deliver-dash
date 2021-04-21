const Notification = require('../../models/Notification')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Customer = require('../../models/Customer')
const Product = require('../../models/Product')
const Delivery = require('../../models/Delivery')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/api/:type/notification/:id', async(req, res) => {
    try{
      const owner = req.params.id
      const {productId, message} = req.body
      
      const notif = new Notification({owner,productId,message})
      await notif.save()

      const product = await Product.find({_id: productId}) 
      notif.name = product.name
      notif.image = product.image

      res.status(200).send(notif)
    }
    catch(e){
      res.status(400).send()
    }
})

router.get('/api/:type/notifications/:id',async (req,res) => {

    try{
      const owner = req.params.id
      const notifs = await notification.find({owner})

      res.status(200).send(notifs)
    }
    catch(e){
      res.status(400).send()
    }
})

module.exports = router

