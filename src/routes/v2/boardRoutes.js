const express = require('express')

const validator = require('~/middlewares/validate.middleware')
const { board } = require('~/schema')
const { asyncHandler } = require('~/hepler')
const boardController = require('~/controllers/board.controller')

const boardRoutes = express.Router()

boardRoutes.route('/')
  .post(validator({
    body: board.createBoard
  }),
  asyncHandler(boardController.createBoard))

boardRoutes.route('/:id')
  .get(asyncHandler(boardController.getDetails))
  .put(validator({
    body: board.update
  }),
  asyncHandler(boardController.update))

module.exports = boardRoutes
