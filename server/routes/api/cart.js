const Product = require('../../models/Product')
const Cart = require('../../models/Cart')

const config = require('config')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// View All Items in Cart
router.get('/api/:type/cart/:id', async(req, res) => {
  const ownerType = req.params.type
  const buyerId = req.params.id

  const cartItems = await Cart.find({ owner: buyerId, ownerType })
  
  res.send(cartItems)
})

// Order all items in the cart

router.patch('/api/:type/buy/:id', async (req, res) => {

  try {
    const ownerType = req.params.type
    const buyerId = req.params.id

    const cartItems = await Cart.find({ owner: buyerId, ownerType })

    for (let i = 0; i < cartItems.length; i++) {
      const buyingQty = cartItems[i].quantity

      const { productId } = cartItems[i]

      const product = await Product.findOne({ _id: productId })
      
      // const sellerId = product.owner
      // const sellingQty = product.quantity
      
      const { name, description, price, image, category } = product
      
      // Seller
      product['quantity'] = product['quantity'] - buyingQty
      
      await product.save()
      // Buyer
      let buyerProduct = await Product.findOne({ name, ownerType })
      
      
      if (buyerProduct)
        buyerProduct['quantity'] += buyingQty
      else{
        buyerProduct = new Product({
          owner: buyerId,
          ownerType,
          name, 
          description,
          price,
          image,
          category,
          quantity: buyingQty
        })
      }
      
      
        await buyerProduct.save()
        console.log("here", buyerProduct)
    }


    await Cart.deleteMany({})
    
    res.status(200).send()

  } catch(e) {
    res.status(400).send()
  }
  
})

// Add Cart Item // Retailer, Wholesaler
router.post('/api/:type/cart/:id', async (req, res) => {
  try {
    const ownerType = req.params.type
    const buyerId = req.params.id
  
    const { productId, quantity } = req.body

    const cartItem = new Cart({ owner: buyerId, ownerType, productId, quantity })
      
    await cartItem.save()
  
    res.send(cartItem)
  }
  catch(e) {
    console.log("Error",e)
  }
  
})

// Update Cart Item Quantity // Retailer, Wholesaler
router.patch('/api/:type/cart/:id', async (req, res) => {
  try {
    const ownerType = req.params.type
    const buyerId = req.params.id

    const { productId, quantity } = req.body

    const product = await Product.findOne({_id: productId})
    const cartItem = await Cart.findOne({ owner: buyerId, ownerType, productId })
    

    console.log("Product = ",cartItem)
    if(cartItem["quantity"] <= product.quantity)
      cartItem['quantity'] = quantity
    else
      return res.status(400).send({error:"Cannot add more items"})
      
    await cartItem.save()

    res.send(cartItem)
  }
  catch(e){
    console.log("Error",e)
    res.status(403).send()
  }
})

// Delete Item from Cart // Retailer, Wholesaler
router.delete('/api/:type/cart/:id', async(req, res) => {
  try {
    const type = req.params.type
    const buyerId = req.params.id

    const { product } = req.body

    const cartItem = await Cart.findOneAndDelete({ owner: buyerId, type, product })

    res.send(cartItem)
  } catch (error) {
    res.status(400).send()
  }
  
})


module.exports = router



