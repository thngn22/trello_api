const { BoardService } = require('~/services')

class BoardController {
  createBoard = async (req, res) => {
    res.sendData(await BoardService.createBoard(req.body))
  }

  getDetails = async (req, res) => {
    const boardId = req.params.id
    res.sendData(await BoardService.getDetails(boardId))
  }
}

module.exports = new BoardController()
