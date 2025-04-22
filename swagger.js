import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voucher API',
      version: '1.0.0',
      description: 'API for managing users, vouchers, and transactions',
    },
    servers: [
      {
        url: 'http://localhost:5500/api',
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger
