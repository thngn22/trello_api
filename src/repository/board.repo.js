'use strict'

const BaseRepository = require('./base.repo')
const { board } = require('~/models')
const mongoose = require('mongoose')

class boardRepo extends BaseRepository {
  constructor() {
    super(board, 'board')
  }

  createBoard = async ({
    title,
    description,
    type
  }) => {
    return await this.create({
      title,
      description,
      type
    })
  }

  getDetail = async (boardId) => {
    const result = await this.model.aggregate([
      { $match: {
        _id: new mongoose.Types.ObjectId(boardId),
        _destroy: false
      } },
      { $lookup: {
        from: 'columns',
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup: {
        from: 'cards',
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ])

    return result[0] || null
  }

  findOneAndUpdateColumnOrderIds = async ({
    boardId,
    columnId
  }) => {
    return await this.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(boardId) },
      { $push: { columnOrderIds: new mongoose.Types.ObjectId(columnId) } },
      { new: true }
    )
  }
}

module.exports = new boardRepo()
