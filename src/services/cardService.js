import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }
    const createCard = await cardModel.createNew(newCard)
    const getCard = await cardModel.findOneById(createCard.insertedId)

    if (getCard) {
      await columnModel.pushCardOrderIds(getCard)
    }

    return getCard
  } catch (error) {
    throw new Error(error)
  }
}

export const cardService = {
  createNew
}
