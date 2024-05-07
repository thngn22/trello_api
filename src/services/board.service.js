const { StatusCodes } = require('http-status-codes')
const { boardRepo } = require('~/repository')
const ApiError = require('~/utils/ApiError')
const { cloneDeep } = require('lodash')

class BoardService {
  static createBoard = async ({
    title,
    description,
    type
  }) => {
    return await boardRepo.createBoard({
      title,
      description,
      type
    })
  }

  static getDetails = async (boardId) => {
    const result = await boardRepo.getDetail(boardId)
    if (!result || result.length === 0) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found Board!!!')

    const reqBoard = cloneDeep(result)
    reqBoard.columns.forEach(column => {
      column.cards = reqBoard.cards.filter(card => card.columnId.equals(column._id))
    })
    delete reqBoard.cards

    return reqBoard
  }

  static update = async (boardId) => {
    await boardRepo.findById(boardId) || (() => { throw new ApiError(StatusCodes.NOT_FOUND, 'Not found Board!!!')})
    return 'tim thay'
  }
}

module.exports = BoardService
