'use strict'
const mongoose = require('mongoose')
const env = require('~/config/environment')
const ApiError = require('~/utils/ApiError')
const { StatusCodes } = require('http-status-codes')

class Database {
  constructor() {
    this.connect()
  }

  connect() {
    if (env.MONGODB_URI) {
      // eslint-disable-next-line no-constant-condition
      // if (1 === 1) {
      // 	mongoose.set('debug', true)
      // 	mongoose.set('debug', { color: true })
      // }
      mongoose
        .connect(env.MONGODB_URI, {
          dbName: env.DATABASE_NAME
        })
        .then(() => {
          console.log('Connection to mongodb created')
        })
        .catch((err) => {
          throw new ApiError(StatusCodes.BAD_REQUEST, new Error(err).message)
        })
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongoDb = Database.getInstance()
module.exports = instanceMongoDb
