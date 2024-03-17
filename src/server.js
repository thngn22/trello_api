/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exithook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', (req, res) => {
  // Test Absolute import mapOrder

    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
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
    console.log(error)
    process.exit(0)
  }
})()
