const Product = require('../../models/Product')

const express = require('express')
const router = express.Router()

// View all products in stock // Retailer, Wholesaler
router.get('/api/:type/stock/:id', async (req, res) => {
  try {
    const ownerType = req.params.type
    const userId = req.params.id
    
    const products = await Product.find({ owner: userId, ownerType })
    
    res.status(200).send(products)
  } catch (e) {
    
  }
})

// View all products in stock // Retailer, Wholesaler
router.get('/api/:type/stock/:id/:productId', async (req, res) => {
  try {
    const ownerType = req.params.type
    const userId = req.params.id
    const productId = req.params.id
    
    const products = await Product.find({ owner: userId, ownerType, productId })
    
    res.send(products)
  } catch (e) {
    
  }
})

// Add a product to stock // Retailer, Wholesaler
router.post('/api/:type/stock/:id', async (req, res) => {
  try {
    const ownerType = req.params.type
    const userId = req.params.id

    const { quantity, name, description, price, image, category } = req.body

    const product = new Product({ owner: userId, ownerType, name, description, price, image, category, quantity })
      
    await product.save()

    return res.send(product)

  } catch (error) {
    
  }
})

// Update a product in stock // Retailer, Wholesaler
router.post('/api/:type/stock/:id/:productId', async (req, res) => {

  try {
    const ownerType = req.params.type
    const userId = req.params.id
    const productId = req.params.productId

    const product = await Product.findOne({ owner: userId, ownerType, _id: productId })

    const updates = Object.keys(req.body)

    updates.forEach((update) => {
      product[update] = req.body[update]
    })

    await product.save()

    return res.send(product)
  } catch (error) {
    
  }
})

// Delete a product in stock
router.delete('/api/:type/stock/:id/:productId', async (req, res) => {
  try {
    const ownerType = req.params.type
    const userId = req.params.id
    const productId = req.params.productId

    const product = await Product.findOneAndDelete({ owner: userId, ownerType, _id: productId })

    return res.send(product)
  } catch (error) {
    
  }
})

module.exports = router