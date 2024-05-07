'use strict'

const { default: mongoose } = require('mongoose')
const BaseRepository = require('./base.repo')
const { card } = require('~/models')

class cardRepo extends BaseRepository {
  constructor() {
    super(card, 'card')
  }

  createCard = async ({
    boardId,
    columnId,
    title
  }) => {
    return await this.create({
      boardId,
      columnId,
      title
    })
  }

  update = async (
    cardId,
    updateData
  ) => {
    const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })

    return await this.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(cardId) },
      updateData
    )
  }
}

module.exports = new cardRepo()
