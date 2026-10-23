import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err: any, req: any, res: any, next: any) => {
  let customError = {
    message: err.message || 'Something went wrong, please try again later',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  }

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  //console.log(customError)
  return res
    .status(customError.statusCode)
    .json({ message: customError.message })
}

export default errorHandlerMiddleware
