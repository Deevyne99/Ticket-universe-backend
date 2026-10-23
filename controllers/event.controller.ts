const StatusCodes = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const Event = require('../models/Events')
const Ticket = require('../models/Tickets')

const createEvent = async (req: any, res: any) => {}

const getAllEvents = async (req: any, res: any) => {}

const getEventById = async (req: any, res: any) => {}

const updateEvent = async (req: any, res: any) => {}

const deleteEvent = async (req: any, res: any) => {}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
}
