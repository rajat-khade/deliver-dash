const mongoose = require('mongoose')

const TransactionSchema = new mongoose.TransactionSchema({
  delivered: {
    type: Boolean,
  },
  from : {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  delivery: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Transaction = mongoose.model('transaction', TransactionSchema)

module.exports = Transaction