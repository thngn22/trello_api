require('dotenv/config')

const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  BUILD_MODE: process.env.BUILD_MODE,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,

  AUTHOR: process.env.AUTHOR
}

module.exports = env
