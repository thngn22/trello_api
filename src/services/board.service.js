const { StatusCodes } = require('http-status-codes')
const { boardRepo, columnRepo, cardRepo } = require('~/repository')
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
    const result = await boardRepo.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(boardId) },
      reqBody
    )
    if (!result) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cant update Board!!!')

    return result
  }

  static moveCardToDifferentColumn = async (reqBody) => {
    const prevColumn = await columnRepo.update(reqBody.prevColumnId,
      { cardOrderIds: reqBody.prevCardOrderIds = reqBody.prevCardOrderIds.map(_id => new mongoose.Types.ObjectId(_id)) }
    )
    if (!prevColumn) throw new ApiError(StatusCodes.BAD_REQUEST, 'Cant update prevColumn!')

    const nextColumn = await columnRepo.update(reqBody.nextColumnId,
      { cardOrderIds: reqBody.nextCardOrderIds = reqBody.nextCardOrderIds.map(_id => new mongoose.Types.ObjectId(_id)) }
    )
    if (!nextColumn) throw new ApiError(StatusCodes.BAD_REQUEST, 'Cant update nextColumn!')

    const currentCardId = await cardRepo.update(reqBody.currentCardId, { columnId: reqBody.nextColumnId })
    if (!currentCardId) throw new ApiError(StatusCodes.BAD_REQUEST, 'Cant update currentCard!')

    return { updateResult: 'Successfully!!!' }
  }
}

module.exports = BoardService
