const express = require('express')
const boardRoutes = require('./boardRoutes')
const columnRoutes = require('./columnRoutes')

const Router = express.Router()

Router.use('/boards', boardRoutes)
Router.use('/columns', columnRoutes)

module.exports = Router
