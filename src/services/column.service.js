const { StatusCodes } = require('http-status-codes')
const { columnRepo, boardRepo } = require('~/repository')
const ApiError = require('~/utils/ApiError')

class ColumnService {
  static createColumn = async ({
    boardId,
    title
  }) => {
    const validBoard = await boardRepo.findById(boardId)
    if (!validBoard) throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid Board')

    const newColumn = await columnRepo.createColumn({
      boardId,
      title
    }) || (() => {throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cant create Column')})

    await boardRepo.findOneAndUpdateColumnOrderIds({
      boardId: newColumn.boardId,
      columnId: newColumn._id
    }) || (() => {throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cant update Column into Board')})

    return newColumn
  }
}

module.exports = ColumnService
