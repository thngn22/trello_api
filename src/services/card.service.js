const { StatusCodes } = require('http-status-codes')
const { cardRepo, columnRepo, boardRepo } = require('~/repository')
const ApiError = require('~/utils/ApiError')

class CardService {
  static createCard = async ({
    boardId,
    columnId,
    title
  }) => {
    const vaildBoard = await boardRepo.findById(boardId)
    if (!vaildBoard) throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid Board')

    const validColumn = await columnRepo.findById(columnId)
    if (!validColumn) throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid Column')

    const newCard = await cardRepo.createCard({
      boardId,
      columnId,
      title
    }) || (() => {throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cant create Card')})

    await columnRepo.findOneAndUpdateCardOrderIds({
      columnId: newCard.columnId,
      cardId: newCard._id
    }) || (() => {throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cant update Card into Column')})


    return newCard
  }
}

module.exports = CardService
