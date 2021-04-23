const Product = require('../../models/Product')
const Cart = require('../../models/Cart')
const Order = require('../../models/Order')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Customer = require('../../models/Customer')

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
// req.body = deliveryDate, deliveryboyID
router.patch('/api/:type/buy/:id', async (req, res) => {

  let sellerLocs = {}
  let productGroups = {}
  let transaction = {}

  try {
    const buyerType = req.params.type
    const buyerId = req.params.id

    const { deliveryGuy, deliveryDate } = req.body
    
    dDate = new Date(deliveryDate)
    console.log(dDate)
    // Buyer
    let buyer
    if (buyerType === 'Customer')
      buyer = await Customer.findOne({ _id: buyerId })

    if (buyerType === 'Retailer')
      buyer = await Retailer.findOne({ _id: buyerId })

    const cartItems = await Cart.find({ owner: buyerId, ownerType: buyerType })
    for (let i = 0; i < cartItems.length; i++) {
      
      const buyingQty = cartItems[i].quantity
      const productId = cartItems[i].productId

      // Product
      let product = await Product.findOne({ _id: productId })
      const { name, description, price, image, category, owner: sellerId } = product
      
      // Seller
      let seller
      if (buyerType === 'Customer')
        seller = await Retailer.findOne({ _id: sellerId })

      if (buyerType === 'Retailer')
        seller = await Wholesaler.findOne({ _id: sellerId })

      var copyProd = {...product._doc,quantity:buyingQty};

      if(productGroups.hasOwnProperty(sellerId))
        productGroups[sellerId].push(copyProd)
      else
        productGroups[sellerId] = [copyProd]

      sellerLocs[sellerId] = seller.location      

      product['quantity'] = product['quantity'] - buyingQty
      await product.save()
      
      console.log(copyProd)
      let buyerProduct = await Product.findOne({ name, ownerType: buyerType })
      
      if (buyerProduct)
        buyerProduct['quantity'] += buyingQty
      else{
        buyerProduct = new Product({
          owner: buyerId,
          ownerType: buyerType,
          name, 
          description,
          price,
          image,
          category,
          quantity: buyingQty
        })
      }
      
      await buyerProduct.save()

      if(transaction.hasOwnProperty(sellerId))
        transaction[sellerId] += (buyingQty * price)
      else
        transaction[sellerId] = buyingQty * price
    }

    const productList = Object.keys(productGroups)
    
    // console.log(productGroups)
    let orderIds = []
    for (let i = 0; i < productList.length; i++) {
      const sellerId = productList[i]
      console.log(sellerId)
      const order = new Order({ 
        status: "placed",
        productList: productGroups[sellerId], 
        from: sellerLocs[sellerId], 
        to: buyer.location, 
        fromId: sellerId,
        toId: buyerId,
        date: dDate,
        transaction: transaction[sellerId], 
        deliveryGuyId: deliveryGuy[sellerId.toString()]
      })
      
      await order.save()
      orderIds.push(order._id)
    }

    await Cart.deleteMany({})
    
    res.status(200).send(orderIds)

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

    if(quantity < 0)
      return res.status(400).send({error: "Cannot remove more items"})

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
    res.status(400).send()
  }
})

// Delete Item from Cart // Retailer, Wholesaler
router.delete('/api/:type/cart/:id', async(req, res) => {
  try {
    const ownerType = req.params.type
    const buyerId = req.params.id

    const { productId } = req.body

    const cartItem = await Cart.findOneAndDelete({ owner: buyerId, ownerType, productId })
    
    res.send(cartItem)
  } catch (error) {
    res.status(400).send()
  }
  
})


module.exports = router



