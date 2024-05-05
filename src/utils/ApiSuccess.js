'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')

class ApiSuccess {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    data = {}
  }) {
    this.message = !message ? reasonStatusCode : message
    this.name = 'ApiSuccess'
    this.statusCode = statusCode
    this.data = data
  }

  send(res) {
    res.status(this.statusCode).json(this)
  }
}

class OKResponse extends ApiSuccess {
  constructor({ message, data }) {
    super({ message, data })
  }
}

class CreatedResponse extends ApiSuccess {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    data
  }) {
    super({ message, statusCode, reasonStatusCode, data })
  }
}

module.exports = {
  OKResponse,
  CreatedResponse
}
