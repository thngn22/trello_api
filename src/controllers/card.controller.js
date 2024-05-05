const { CardService } = require('~/services')

class CardController {
  createCard = async (req, res) => {
    res.sendData(await CardService.createCard(req.body))
  }
}

module.exports = new CardController()
