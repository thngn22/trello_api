const joi = require('joi')
const { id } = require('./common.schema')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('~/utils/validators')

const boardId = joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
const columnTitle = joi.string()

const createColumn = joi.object().keys({
  boardId: boardId.required(),
  title: columnTitle.required()
})

const update = joi.object().keys({
  title: columnTitle,
  cardOrderIds: joi.array().items(
    joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  )
})

module.exports = {
  createColumn,
  update
}
