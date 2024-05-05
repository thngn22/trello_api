const express = require('express')
const cors = require('cors')
const { corsOptions } = require('~/config/cors')
require('~/config/init.mongodb')
const env = require('~/config/environment')
const httpRequestMiddleware = require('~/middlewares/httpRequest.middleware')
const APIs_V2 = require('~/routes/v2')
const { handleError, handleNotFound } = require('~/middlewares/handleError.middleware')


const app = express()

app.use(cors(corsOptions))

//Enable json data
app.use(express.json())

app.use(httpRequestMiddleware({ responseFormatter: true }))
app.use('/v2', APIs_V2)
app.use(handleNotFound)
app.use(handleError)

app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello ${ env.AUTHOR }, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
})
