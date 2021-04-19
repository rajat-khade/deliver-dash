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

router.get('/api/search', async (req, res) => {
  const term = req.query.term

  try {
    const regex =  new RegExp(term,'i');
    const products = await Product.find({ "name": regex })
    // products = JSON.parse(products)

    // const results = products.filter((product) => {
    //   return product.name.match(`/${term}/i`).length > 0
    // })

    if (products.length === 0)
      products = 'No item available' 

    res.status(200).send(products)

  } catch(e) {
    res.status(400).send()
  }
})

module.exports = router