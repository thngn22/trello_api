import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
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
    throw new Error(error)
  }
}

export const columnService = {
  createNew
}
