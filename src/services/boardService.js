import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  // Tạm thời chưa để try/catch bắt lỗi vào vì đang luôn cho logic đúng
  const newBoard = {
    ...reqBody,
    slug: slugify(reqBody.title)
  }
  return newBoard
}

export const boardService = {
  createNew
}
