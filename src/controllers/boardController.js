import { StatusCodes } from 'http-status-codes'
// import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body in Controller', req.body)
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'cc gi do')
    const createBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
