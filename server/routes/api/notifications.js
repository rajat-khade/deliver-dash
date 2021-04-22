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
      const {orderId, status} = req.body
      
      // const product = await Product.findOne({_id: productId}) 
      
      const notif = new Notification({owner,orderId,status})
      await notif.save()

      res.status(200).send(notif)
    }
    catch(e){
      res.status(400).send()
    }
})


router.get('/api/:type/notifications/:id',async (req,res) => {

    try{
      const owner = req.params.id
      const notifs = await Notification.find({owner})

      res.status(200).send(notifs)
    }
    catch(e){
      res.status(400).send()
    }
})

module.exports = router

