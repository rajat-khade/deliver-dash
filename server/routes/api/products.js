const Product = require('../../models/Product')

const express = require('express')
const router = express.Router()

// View all products which can be bought // Customer, Retailer
router.get('/api/:type/products', async (req, res) => {
  try {
    const buyerType = req.params.type
    const category = req.query.category

    let ownerType

    if(buyerType==="Customer")
      ownerType = "Retailer"
    else if(buyerType === "Retailer")
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



module.exports = router



