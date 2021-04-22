const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
  status: {
    required: true,
    type: String,
  },
  orderId : {
    required: true,
    type: mongoose.Types.ObjectId
  }
})

const Notification = mongoose.model('notification', NotificationSchema)

module.exports = Notification