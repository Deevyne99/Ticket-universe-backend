import CustomApiError from './CustomApiError'
import { StatusCodes } from 'http-status-codes'

class UnAuthorisedError extends CustomApiError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}

export default UnAuthorisedError
