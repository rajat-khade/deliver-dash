const express = require('express')
const connectDB = require('../config/db')
const { urlencoded } = require('body-parser')
const authRoute = require('./routes/api/auth.js')

const app = express()

// Database connected
connectDB()

const port = process.env.PORT || 3000

app.use(express.json({ extended: false }))

app.use(authRoute)

app.listen(port, () => console.log(`Server started on ${port}...`))