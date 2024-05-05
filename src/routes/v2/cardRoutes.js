const express = require('express')

const validator = require('~/middlewares/validate.middleware')
const { card } = require('~/schema')
const { asyncHandler } = require('~/hepler')
const CardController = require('~/controllers/card.controller')

const cardRoutes = express.Router()

cardRoutes.route('/')
  .post(validator({
    body: card.createCard
  }),
  asyncHandler(CardController.createCard))

module.exports = cardRoutes
