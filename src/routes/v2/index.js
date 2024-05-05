const express = require('express')
const boardRoutes = require('./boardRoutes')
const columnRoutes = require('./columnRoutes')
const cardRoutes = require('./cardRoutes')

const Router = express.Router()

Router.use('/boards', boardRoutes)
Router.use('/columns', columnRoutes)
Router.use('/cards', cardRoutes)

module.exports = Router
