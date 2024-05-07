const { StatusCodes } = require('http-status-codes')
const { boardRepo } = require('~/repository')
const ApiError = require('~/utils/ApiError')
const { cloneDeep } = require('lodash')
const mongoose = require('mongoose')

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

  static update = async (boardId, reqBody) => {
    const validBoard = await boardRepo.findById(boardId)
    if (!validBoard)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not found Board!!!')

    const result = await boardRepo.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(boardId) },
      reqBody
    )
    if (!result) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cant update Board!!!')

    return result
  }
}

module.exports = BoardService
