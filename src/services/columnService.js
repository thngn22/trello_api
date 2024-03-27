import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createColumn = await columnModel.createNew(newColumn)
    const getColumn = await columnModel.findOneById(createColumn.insertedId)

    //...

    return getColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const columnService = {
  createNew
}
