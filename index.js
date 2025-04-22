import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import voucherRoutes from './routes/voucherRoutes.js'
import authRoutes from './routes/authRoutes.js'
import setupSwagger from './swagger.js'

/**
 * creates a server listening on port 5500 and Connects
 * to the local MongoDB vouchers database using Mongoose ODM.
 * @function main
 * @returns {Promise<void>}
 */

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/vouchers', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err)
    process.exit(1)
  }

  const app = express()
  const port = 5500

  app.use(express.json())
  app.use(cors())

  app.use('/api/auth', authRoutes)
  app.use('/api/vouchers', voucherRoutes)
  setupSwagger(app)
  app.listen(port, () => {
    console.log(`started node server on port ${port}`)
  })
}

main()
