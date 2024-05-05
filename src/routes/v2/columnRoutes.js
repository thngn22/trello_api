const express = require('express')

const validator = require('~/middlewares/validate.middleware')
const { column } = require('~/schema')
const { asyncHandler } = require('~/hepler')
const columnController = require('~/controllers/column.controller')

const columnRoutes = express.Router()

columnRoutes.route('/')
  .post(validator({
    body: column.createColumn
  }),
  asyncHandler(columnController.createColumn))

module.exports = columnRoutes
