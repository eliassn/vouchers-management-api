import mongoose from 'mongoose'

/**
 * Transaction schema to represent a transaction related to vouchers.
 * @type {mongoose.Schema}
 */
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Voucher',
    },
    type: {
      type: String,
      enum: ['purchase', 'redeem'],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

/**
 * Creates a Transaction model from the transaction schema.
 * @type {mongoose.Model}
 */
const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
