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

columnRoutes.route('/:id')
  .put(validator({
    body: column.update
  }),
  asyncHandler(columnController.update))

module.exports = columnRoutes
