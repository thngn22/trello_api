const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/utils/ApiError')

const defaultSchemas = { body: null, query: null, params: null }
const validate = (schema = defaultSchemas) => {
  return (req, res, next) => {
    const validateFields = ['body', 'query', 'params']
    validateFields.forEach((field) => {
      if (schema[field]) {
        const { error, value } = schema[field].validate(req[field], {
          abortEarly: false
        })
        if (error) next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error).message))
        req[field] = value
      }
    })
    next()
  }
}

module.exports = validate
