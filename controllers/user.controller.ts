import type { Request, Response } from 'express'

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const User = require('../models/User')

const createTokenUser = require('../utils/createTokenuUser')

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError('User already exists')
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'Admin' : 'User'
  const user = await User.create({ name, email, password, role })
  const tokenuser = createTokenUser(user)
  res.status(StatusCodes.CREATED).json({ user: tokenuser })
}

const getUser = (req: Request, res: Response): void => {
  res.json({ message: 'Hello from the user controller!' })
}

module.exports = { getUser, registerUser }
