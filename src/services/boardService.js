import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createBoard = await boardModel.createNew(newBoard)
    const getBoard = await boardModel.findOneById(createBoard.insertedId)

    return getBoard
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Boards not found!')
    }

    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Boards not found!')
    }

    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const updateBoard = await boardModel.update(boardId, updateData)

    return updateBoard
  } catch (error) {
    throw error
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    //Update lại field cardOrderIds ở prevColumn
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })

    //Update lại field cardOrderIds ở newColumn
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })

    //Update lại field columnId ở card
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully' }
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
