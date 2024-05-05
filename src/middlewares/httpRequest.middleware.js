const ApiSuccess = require('~/utils/ApiSuccess')

const httpRequestMiddleware = ({
  responseFormatter = true
}) => {
  return (req, res, next) => {
    if (responseFormatter) {
      const responseTypes = Object.keys(ApiSuccess).map(
        (e) => e.split('Response')[0]
      )
      res.sendData = (data, type = responseTypes[0], message) => {
        new ApiSuccess[`${type}Response`]({
          data,
          message
        }).send(res)
      }
    }
    next()
  }
}

module.exports = httpRequestMiddleware
