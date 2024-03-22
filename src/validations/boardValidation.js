import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    //Chỉ định abortEarly: false để trường hợp có nhiều lỗi ở validation thì có thể trả về toàn bộ
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create new board', code: `${ StatusCodes.CREATED }` })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}