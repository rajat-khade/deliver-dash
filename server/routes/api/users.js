const Product = require('../../models/Product')
const Retailer = require('../../models/Retailer')
const Wholesaler = require('../../models/Wholesaler')
const Customer = require('../../models/Customer')
const Delivery = require('../../models/Delivery')
const Feedback = require('../../models/Feedback')

const express = require('express')
const router = express.Router()

// View all products which can be bought // Customer, Retailer
router.get('/api/:type/products', async (req, res) => {
  try {
    const userType = req.params.type

    let ownerType
    if(buyerType==="Customer")
    ownerType = "Retailer"
    else
      ownerType = "Wholesaler"
    
    let products = []

    if (category)
      products = await Product.find({ ownerType, category })
    else
      products = await Product.find({ ownerType })
    
    res.status(200).send(products)
  } catch(e) {
    
  }
})

// View product // Customer, Retailer
router.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id

    const product = await Product.findOne({ _id: productId })
    
    res.status(200).send(product)
  } catch(e) {

  }
})

// Order product // Customer, Retailer
router.patch('/api/:type/products/:id', async (req, res) => {
  try {
    // const sellerType = req.params.type
    // const buyerId = req.params.id
    // const { sellerId, quantity, productId } = req.body

    // const product = await Product.findOne({ _id: productId, owner: buyerId })

    // if (product)
    //   product['quantity'] += quantity
    // else
    //   await new Product({ })

    await product.save()

    res.status(200)
  } catch (e) {
    console.log("Error",e)
  }
})


router.get('/api/:type/all', async (req, res) => {
  try {
    const type = req.params.type

    let users = []
    
    if(type === "Customer")
      users = await Customer.find({})
    if(type === "Retailer")
      users = await Retailer.find({})
    if(type === "Wholesaler")
      users = await Wholesaler.find({})
    if(type === "Delivery")
      users = await Delivery.find({})

    return res.status(200).send(users)
  }
  catch(e){
    res.status(400).send()
  }

})

router.post('/api/feedback', async(req,res) => {
  try{
    const owner = req.query.owner
    const {name, message} = req.body

    let feedback = new Feedback({
      owner,
      name,
      message
    })

    console.log(feedback)
    await feedback.save()

    res.status(200).send(feedback)
  }
  catch(e){
    res.status(400).send()
  }
})



module.exports = router



