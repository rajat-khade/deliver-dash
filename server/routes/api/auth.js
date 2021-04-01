const Customer = require('../../models/Customer')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/api/signup', async (req, res) => {
  const { name, email, password, location, type } = req.body

  try {
    let user = null

    if (type === 'Customer') {
      user = Customer.findOne({ email })

      if (user)
        res.status(400).send('Customer already exists')

      user = new Customer({ name, email, password, location, type })
    }

    if (type === 'Retailer') {
      user = Retailer.findOne({ email })
      
      if (user)
        res.status(400).send('Retailer already exists')
      
      user = new Retailer({ name, email, password, location, type })
    }

    if (type === 'Wholesaler') {
      user = Wholesaler.findOne({ email })
      if (user)
        res.status(400).send('Wholesaler already exists')
      
      user = new Wholesaler({ name, email, password, location, type })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    res.send(user)
    
  } catch (error) {
    if (error) console.log(error.data)
  }
})

router.post('/api/customer/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    res.status(400).send('Please provide email and password')

  try {
    
    const user = await Customer.findOne({ email })

    if (!user)
      res.status(400).send('Invalid Credentials')
      
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
      res.status(400).send('Invalid Credentials')

    const payload = { user: { id: user._id }}

    jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err

      res.status(200).send({ token })
    })
    
  } catch (error) {
    res.status(401).send(error)
  }

})

router.post('/api/retailer/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    res.status(400).send('Please provide email and password')

  try {
    
    const user = await Customer.findOne({ email })

    if (!user)
      res.status(400).send('Invalid Credentials')
      
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
      res.status(400).send('Invalid Credentials')

    const payload = { user: { id: user._id }}

    jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err

      res.status(200).send({ token })
    })
    
  } catch (error) {
    res.status(401).send(error)
  }

})

router.post('/api/wholesaler/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    res.status(400).send('Please provide email and password')

  try {
    
    const user = await Customer.findOne({ email })

    if (!user)
      res.status(400).send('Invalid Credentials')
      
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
      res.status(400).send('Invalid Credentials')

    const payload = { user: { id: user._id }}

    jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err

      res.status(200).send({ token })
    })
    
  } catch (error) {
    res.status(401).send(error)
  }

})

module.exports = router
