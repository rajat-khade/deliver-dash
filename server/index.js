const express = require('express')
const connectDB = require('../config/db')
const path = require('path')
const { urlencoded } = require('body-parser')
const authRoute = require('./routes/api/auth.js')
const productsRoute = require('./routes/api/products.js')
const usersRoute = require('./routes/api/users.js')
const cartRoute = require('./routes/api/cart.js')
const stockRoute = require('./routes/api/stock.js')
const ordersRoute = require('./routes/api/orders.js')
const notifRoute = require('./routes/api/notifications.js')
const cors = require("cors")

const app = express()

// Database connected
connectDB()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ extended: false }))

app.use(authRoute)
app.use(productsRoute)
app.use(usersRoute)
app.use(cartRoute)
app.use(notifRoute)
app.use(stockRoute)
app.use(ordersRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Server started on ${port}...`))