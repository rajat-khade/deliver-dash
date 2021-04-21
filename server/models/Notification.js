const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
  message: {
    required: true,
    type: String,
  },
  productId : {
    required: true,
    type: mongoose.Types.ObjectId
  }
})

const Notification = mongoose.model('notification', NotificationSchema)

module.exports = Notification