'use strict'

const BaseRepository = require('./base.repo')
const { column } = require('~/models')

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
}

module.exports = new columnRepo()
