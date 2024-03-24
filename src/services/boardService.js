import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

export const boardService = {
  createNew
}
