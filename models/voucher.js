import mongoose from 'mongoose'

/**
 * Voucher schema to represent a voucher in the system.
 * @type {mongoose.Schema}
 */
const voucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'redeemed'],
      default: 'active',
    },
    expiryDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > Date.now()
        },
        message: 'Expiry date must be in the future',
      },
    },
  },
  {
    timestamps: true,
  },
)

/**
 * Creates a Voucher model from the voucher schema.
 * @type {mongoose.Model}
 */
const Voucher = mongoose.model('Voucher', voucherSchema)

export default Voucher
