'use strict'

const BaseRepository = require('./base.repo')
const { column } = require('~/models')
const mongoose = require('mongoose')

class columnRepo extends BaseRepository {
  constructor() {
    super(column, 'column')
  }

  createColumn = async ({
    boardId,
    title
  }) => {
    return await this.create({
      boardId,
      title
    })
  }

  findOneAndUpdateCardOrderIds = async ({
    columnId,
    cardId
  }) => {
    return await this.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(columnId) },
      { $push: { cardOrderIds: new mongoose.Types.ObjectId(cardId) } },
      { new: true }
    )
  }

  update = async (
    columnId,
    updateData
  ) => {
    const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })

    return await this.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(columnId) },
      updateData
    )
  }
}

module.exports = new columnRepo()
