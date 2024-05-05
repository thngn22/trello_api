/* eslint-disable no-console */
const { StatusCodes } = require('http-status-codes')
const env = require('~/config/environment')

const handleNotFound = (req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
}

// eslint-disable-next-line no-unused-vars
const handleError = (error, req, res, next) => {
  if (!error.statusCode) error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: error.statusCode,
    message: error.message || StatusCodes[error.statusCode],
    stack: error.stack
  }

  // console.log('responseError', responseError)

  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi.
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  res.status(responseError.statusCode).json(responseError)
}

module.exports = {
  handleError,
  handleNotFound
}
