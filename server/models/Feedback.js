const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const Feedback = mongoose.model('feedback', FeedbackSchema)

module.exports = Feedback