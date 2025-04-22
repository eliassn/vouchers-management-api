import Transaction from '../models/transaction.js'
import User from '../models/user.js'
import Voucher from '../models/voucher.js'

export async function purchaseVoucherService(userId, voucherId) {
  const user = await User.findById(userId)
  const voucher = await Voucher.findById(voucherId)

  if (!user || !voucher) throw new Error('User or voucher not found')
  if (user.balance < voucher.value) throw new Error('Insufficient balance')

  user.balance -= voucher.value
  await user.save()

  const transaction = new Transaction({
    userId,
    voucherId,
    type: 'purchase',
    date: new Date(),
  })

  await transaction.save()
  return transaction
}

export async function redeemVoucherService(userId, voucherId) {
  const voucher = await Voucher.findById(voucherId)

  if (!voucher) throw new Error('Voucher not found')
  if (voucher.status === 'redeemed') throw new Error('Voucher already redeemed')
  if (new Date(voucher.expiryDate) < new Date())
    throw new Error('Voucher expired')

  voucher.status = 'redeemed'
  await voucher.save()

  const transaction = new Transaction({
    userId,
    voucherId,
    type: 'redeem',
    date: new Date(),
  })

  await transaction.save()
  return transaction
}

export async function getUserTransactionsService(userId) {
  return await Transaction.find({ userId }).populate('voucherId')
}
