require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const http = require('http')
const cors = require('cors')

/**
 * server configuration
 */
const config = require('./config')
const { DatabaseService, LoggerService } = require('./services')
const { LogMiddleware, AuthMiddleware } = require('./api/middlewares')

// serverConfig: development, staging, production
const allowedConfigs = ['development', 'staging', 'production']
const serverConfig = process.env.SERVER_CONFIG || 'production'

/**
 * express application
 */
const app = express()
const server = http.Server(app)
const DB = DatabaseService.start()

// Express routes

// const companyRouter = require('./api/routes/CompanyRouter')

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors())

// secure express app
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  }),
)

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const {
  AuthRouter,
  InboxRouter,
  UserRouter,
} = require('./api/routes')

app.use(`${config.routerPrefix}/auth`, LogMiddleware, AuthRouter)
app.use(
  `${config.routerPrefix}/inbox`,
  [LogMiddleware, AuthMiddleware.verifyToken],
  InboxRouter,
)
app.use(
  `${config.routerPrefix}/user`,
  [LogMiddleware, AuthMiddleware.verifyToken],
  UserRouter,
)
server.listen(config.port, () => {
  if (!allowedConfigs.includes(serverConfig)) {
    LoggerService.logger.error(
      `SERVER_CONFIG is set to ${serverConfig}, but only production and development are valid.`,
    )
    process.exit(1)
  }
  LoggerService.logger.info(
    `Server is running with ${serverConfig} config on port ${config.port}`,
  )
  return DB
})
