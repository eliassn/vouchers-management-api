import express from 'express'
import {
  getAvailableVouchersController,
  createVoucherController,
  updateVoucherController,
  deleteVoucherController,
} from '../controllers/voucherController.js'

import {
  purchaseVoucherController,
  redeemVoucherController,
} from '../controllers/transactionController.js'

import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: Voucher management
 */

/**
 * @swagger
 * /vouchers:
 *   get:
 *     summary: Get all available vouchers
 *     tags: [Vouchers]
 *     responses:
 *       200:
 *         description: A list of vouchers
 */

/**
 * @swagger
 * /vouchers:
 *   post:
 *     summary: Create a new voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer <your_token_here>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - value
 *               - status
 *               - expiryDate
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               value:
 *                 type: number
 *               status:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Voucher created
 */

/**
 * @swagger
 * /vouchers/{id}:
 *   put:
 *     summary: Update a voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer <your_token_here>
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Voucher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               value:
 *                 type: number
 *               status:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Voucher updated
 */

/**
 * @swagger
 * /vouchers/{id}:
 *   delete:
 *     summary: Delete a voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer <your_token_here>
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Voucher ID
 *     responses:
 *       200:
 *         description: Voucher deleted
 */

/**
 * @swagger
 * /vouchers/purchase:
 *   post:
 *     summary: Purchase a voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer <your_token_here>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - voucherId
 *               - userId
 *             properties:
 *               voucherId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Voucher purchased
 */

/**
 * @swagger
 * /vouchers/redeem:
 *   post:
 *     summary: Redeem a voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           default: Bearer <your_token_here>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - voucherId
 *               - userId
 *             properties:
 *               voucherId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Voucher redeemed
 */

// Routes
router.get('/', getAvailableVouchersController)
router.post('/', isAuthenticated, isAdmin, createVoucherController)
router.put('/:id', isAuthenticated, isAdmin, updateVoucherController)
router.delete('/:id', isAuthenticated, isAdmin, deleteVoucherController)
router.post('/purchase', isAuthenticated, purchaseVoucherController)
router.post('/redeem', isAuthenticated, redeemVoucherController)

export default router
