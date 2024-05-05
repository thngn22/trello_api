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
}

module.exports = new columnRepo()
