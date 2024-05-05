'use strict'

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
}

module.exports = new cardRepo()
