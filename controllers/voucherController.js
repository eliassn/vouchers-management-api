import {
  createVoucherService,
  getAvailableVouchersService,
  updateVoucherService,
  deleteVoucherService,
} from '../services/voucherService.js'

/**
 * @desc Admin: Create a new voucher
 */
export async function createVoucherController(req, res) {
  try {
    const voucher = await createVoucherService(req.body)
    res.status(201).json({ message: 'Voucher created', voucher })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

/**
 * @desc Public: Retrieve available vouchers
 */
export async function getAvailableVouchersController(req, res) {
  try {
    const vouchers = await getAvailableVouchersService()
    res.status(200).json({ vouchers })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

/**
 * @desc Admin: Update voucher details
 */
export async function updateVoucherController(req, res) {
  try {
    const voucher = await updateVoucherService(req.params.id, req.body)
    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' })
    }
    res.status(200).json({ message: 'Voucher updated', voucher })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

/**
 * @desc Admin: Delete a voucher
 */
export async function deleteVoucherController(req, res) {
  try {
    const voucher = await deleteVoucherService(req.params.id)
    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' })
    }
    res.status(200).json({ message: 'Voucher deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
