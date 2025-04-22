import {
  purchaseVoucherService,
  redeemVoucherService,
  getUserTransactionsService,
} from '../services/transactionService.js'

/**
 * @desc Purchase a voucher (reduces user balance)
 */
export async function purchaseVoucherController(req, res) {
  const { userId, voucherId } = req.body
  try {
    const transaction = await purchaseVoucherService(userId, voucherId)
    res.status(201).json({ message: 'Voucher purchased', transaction })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

/**
 * @desc Redeem a voucher (only if not expired and not redeemed)
 */
export async function redeemVoucherController(req, res) {
  const { userId, voucherId } = req.body
  try {
    const transaction = await redeemVoucherService(userId, voucherId)
    res.status(200).json({ message: 'Voucher redeemed', transaction })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

/**
 * @desc Get user's transaction history
 */
export async function getUserTransactionsController(req, res) {
  const { userId } = req.params
  try {
    const transactions = await getUserTransactionsService(userId)
    res.status(200).json({ transactions })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
