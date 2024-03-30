import { StatusCodes } from 'http-status-codes'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }
    const validBoard = await columnModel.getDetails(newCard.columnId)
    if (!validBoard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Columns not found!')
    }


    const createCard = await cardModel.createNew(newCard)
    const getCard = await cardModel.findOneById(createCard.insertedId)

    if (getCard) {
      await columnModel.pushCardOrderIds(getCard)
    }

    return getCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
