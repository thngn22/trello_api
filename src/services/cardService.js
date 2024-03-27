import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }
    const createCard = await cardModel.createNew(newCard)
    const getCard = await cardModel.findOneById(createCard.insertedId)

    //...

    return getCard
  } catch (error) {
    throw new Error(error)
  }
}

export const cardService = {
  createNew
}
