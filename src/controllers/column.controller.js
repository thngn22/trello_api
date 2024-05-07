const { ColumnService } = require('~/services')

class ColumnController {
  createColumn = async (req, res) => {
    res.sendData(await ColumnService.createColumn(req.body))
  }

  update = async (req, res) => {
    const columnId = req.params.id
    res.sendData(await ColumnService.update(columnId, req.body))
  }
}

module.exports = new ColumnController()
