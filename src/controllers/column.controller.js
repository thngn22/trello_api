const { ColumnService } = require('~/services')

class ColumnController {
  createColumn = async (req, res) => {
    res.sendData(await ColumnService.createColumn(req.body))
  }
}

module.exports = new ColumnController()
