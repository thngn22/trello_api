const joi = require('joi')
const { id } = require('./common.schema')
const { BOARD_TYPE } = require('~/utils/constants')

const boardTitle = joi.string()
const boardDescription = joi.string()
const boardType = joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE)

const createBoard = joi.object().keys({
  title: boardTitle.required(),
  description: boardDescription.required(),
  type: boardType.required()
})

module.exports = {
  createBoard
}
