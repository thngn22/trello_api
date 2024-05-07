const joi = require('joi')
const { id } = require('./common.schema')
const { BOARD_TYPE } = require('~/utils/constants')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('~/utils/validators')

const boardTitle = joi.string()
const boardDescription = joi.string()
const boardType = joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE)

const createBoard = joi.object().keys({
  title: boardTitle.required(),
  description: boardDescription.required(),
  type: boardType.required()
})

const update = joi.object().keys({
  title: boardTitle,
  description: boardDescription,
  type: boardType,
  columnOrderIds: joi.array().items(
    joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  )
})

const moveCardToDifferentColumn = joi.object().keys({
  currentCardId: joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  prevColumnId: joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  prevCardOrderIds: joi.array().required().items(
    joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ),

  nextColumnId: joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  nextCardOrderIds: joi.array().required().items(
    joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  )
})

module.exports = {
  createBoard,
  update,
  moveCardToDifferentColumn
}
