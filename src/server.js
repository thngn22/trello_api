import express from 'express'
import exithook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'

const START_SERVER = () => {
  const app = express()

  //Enable json data
  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
    console.log(`Hello ${ env.AUTHOR }, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exithook(() => {
    CLOSE_DB()
  })
}

(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    // console.log(error)
    process.exit(0)
  }
})()
