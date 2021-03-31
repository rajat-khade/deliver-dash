const Customer = require('../../models/Customer')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')

const express = require('express')
const router = express.Router()

router.post('/api/signup', async (req, res) => {
  const { name, email, password, location, type } = req.body

  try {
    let user = null

    if (type === 'Customer')
      user = new Customer({ name, email, password, location, type })

    if (type === 'Retailer')
      user = new Retailer({ name, email, password, location, type })

    if (type === 'Wholesaler')
      user = new Wholesaler({ name, email, password, location, type })
  
    await user.save()

    res.send(user)
    
  } catch (error) {
    if (error) console.log(error.data)
  }
})

router.post('/api/customer/login', async (req, res) => {
  const { name, email, password } = req.body

  if (!name && !email) {
    res.status(400).send('Please provide email or username')
  }

  try {
    let user = null

    if (!name)
      user = await Customer.findOne({ email, password })
  
    if (!email)
      user = await Customer.findOne({ name, password })

    if (!user)
      res.status(401).send('User not found')
      
    res.send(user)
    
  } catch (error) {
    res.status(401).send(error)
  }

})

module.exports = router
