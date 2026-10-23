const express = require('express')
const { getUser } = require('../controllers/user.controller')

const router = express.Router()

router.get('/user', getUser)

// CommonJS export
module.exports = router
