const Product = require('../../models/Product')

const express = require('express')
const router = express.Router()

// View all products which can be bought // Customer, Retailer
router.get('/api/:type/products', async (req, res) => {
  try {
    const buyerType = req.params.type
    const category = req.query.category
    const unique = req.query.unique

    let ownerType

    if(buyerType==="Customer")
      ownerType = "Retailer"
    else if(buyerType === "Retailer")
      ownerType = "Wholesaler"
    
    let products = []
    let result = []

    if (category)
      products = await Product.find({ ownerType, category })
    else
      products = await Product.find({ ownerType })
    
    
    if(unique === "true"){
      let names = new Set()
      products.forEach((product)=>{
        if(names.has(product.name))
          return
        
        result.push(product)
        names.add(product.name)
      })
    }
    else
      result = products
      

    res.status(200).send(result)
  } catch(e) {
    
  }
})


// View all unique products
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
    let result = []

    if (category)
      products = await Product.find({ ownerType, category })
    else
      products = await Product.find({ ownerType })
    
    

    res.status(200).send(result)
  } catch(e) {
    
  }
})


//Edit product from stock
router.patch('/api/products/:id', async (req,res) => {
  try {
    const productId = req.params.id
    const {price, quantity} = req.body 

    const product = await Product.findOne({_id : productId})
    product.price = price
    product.quantity = quantity

    await product.save()

    res.status(200).send(product)
  }
  catch(e){
    res.status(400).send()
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

router.get('/api/:type/search', async (req, res) => {
  const term = req.query.term
  const buyerType = req.params.type
  const unique = req.query.unique
  try {

    let ownerType

    if(buyerType==="Customer")
      ownerType = "Retailer"
    else if(buyerType === "Retailer")
      ownerType = "Wholesaler"

    const regex =  new RegExp(term,'i');
    const products = await Product.find({ "name": regex, ownerType })

    let result = []
    let names = new Set()
    products.forEach((product)=>{
      if(names.has(product.name))
        return
      
      result.push(product)
      names.add(product.name)
    })
    
    // products = JSON.parse(products)

    // const results = products.filter((product) => {
    //   return product.name.match(`/${term}/i`).length > 0
    // })

    if (result.length === 0)
      result = 'No item available' 

    res.status(200).send(result)

  } catch(e) {
    res.status(400).send()
  }
})

module.exports = router