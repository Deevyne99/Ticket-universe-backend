import CustomApiError from './CustomApiError'
import { StatusCodes } from 'http-status-codes'

class UnAuthenticatedError extends CustomApiError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}

export default UnAuthenticatedError
