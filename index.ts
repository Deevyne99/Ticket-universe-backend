require('dotenv').config()
require('express-async-errors')

const express = require('express')
const userRouter = require('./routes/user.routes.ts')
const connectDB = require('./db/connectDB.ts')

const app = express()
const PORT = process.env.PORT || 5000

//Middleware
app.use(express.json())

// Mount routes
app.use('/api', userRouter)

const start = async () => {
  try {
    // You can add any asynchronous initialization logic here if needed
    console.log('Server is starting...')
    await connectDB(process.env.MONGO_URI) // Ensure the database connection is established before starting the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log('Error starting the server:', error)
  }
}

start()
