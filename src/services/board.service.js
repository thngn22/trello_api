const { boardRepo } = require('~/repository')

class BoardService {
  static createBoard = async ({
    title,
    description,
    type
  }) => {
    return await boardRepo.createBoard({
      title,
      description,
      type
    })
  }

  static getDetails = async ({
    id
  }) => {
    return await boardRepo.getDetails({
      id
    })
  }
}

module.exports = BoardService
