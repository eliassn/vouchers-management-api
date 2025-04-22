import Voucher from '../models/voucher.js'

export async function createVoucherService(voucherData) {
  const newVoucher = new Voucher(voucherData)
  return await newVoucher.save()
}

export async function getAvailableVouchersService() {
  return await Voucher.find({ status: 'active' })
}

export async function updateVoucherService(id, updates) {
  return await Voucher.findByIdAndUpdate(id, updates, { new: true })
}

export async function deleteVoucherService(id) {
  return await Voucher.findByIdAndDelete(id)
}
