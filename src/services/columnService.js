import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const validBoard = await boardModel.getDetails(newColumn.boardId)
    if (!validBoard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Boards not found!')
    }

    const createColumn = await columnModel.createNew(newColumn)
    const getColumn = await columnModel.findOneById(createColumn.insertedId)

    if (getColumn) {
      //Trả lại response có thêm field 'cards'=[]
      getColumn.cards = []

      //Thêm column mới tạo vào field columnOrderIds trong bảng board
      await boardModel.pushColumnOrderIds(getColumn)
    }

    return getColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const updateColumn = await columnModel.update(columnId, updateData)

    return updateColumn
  } catch (error) {
    throw error
  }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found Column!!!')

    await boardModel.pullColumnOrderIds(targetColumn)

    await columnModel.deleteOneById(columnId)

    await cardModel.deleteManyByColumnId(columnId)

    return { deleteResult: 'Column and its Cards were deleted successfully!!!' }
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}
