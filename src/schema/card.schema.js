const joi = require('joi')
const { id } = require('./common.schema')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('~/utils/validators')

const boardId = joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
const columnId = joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
const cardTitle = joi.string()

const createCard = joi.object().keys({
  boardId: boardId.required(),
  columnId: columnId.required(),
  title: cardTitle.required()
})

module.exports = {
  createCard
}
