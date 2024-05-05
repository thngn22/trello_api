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

  getBoardById = async ({
    id
  }) => {
    return await this.findById(id)
  }

  findOneAndUpdateCardOrderIds = async ({
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
