import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = (req, res, next) => {
  try {
    console.log('req.body in Controller', req.body)
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'cc gi do')
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board', code: `${ StatusCodes.CREATED }` })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
