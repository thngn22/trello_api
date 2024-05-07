const { BoardService } = require('~/services')

class BoardController {
  createBoard = async (req, res) => {
    res.sendData(await BoardService.createBoard(req.body))
  }

  getDetails = async (req, res) => {
    const boardId = req.params.id
    res.sendData(await BoardService.getDetails(boardId))
  }

  update = async (req, res) => {
    const boardId = req.params.id
    res.sendData(await BoardService.update(boardId, req.body))
  }

  moveCardToDifferentColumn = async (req, res) => {
    res.sendData(await BoardService.moveCardToDifferentColumn(req.body))
  }
}

module.exports = new BoardController()
