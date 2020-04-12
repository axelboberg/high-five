/**
 * Axel Boberg © 2020
 */

require('dotenv').config()
const http = require('http')

const middleware = require('./lib/middleware')
const express = require('express')
const app = express()

const listeners = require('./lib/listeners')
const room = require('./lib/room')
const io = require('./lib/io')

const PORT = process.env.PORT || 80

const server = http.createServer(app)

// Init socket and rooms
io.setup(server)
room.setInstance(io.getInstance())
listeners.setInstance(io.getInstance())

// Init middleware
middleware(app)

/**
 * Handle Express errors
 */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }

  if (!err.status || !err.message) {
    err = {
      status: 500,
      message: 'Internal server error'
    }
  }

  res
    .status(err.status)
    .end(JSON.stringify({
      code: err.code,
      message: err.message,
      status: err.status
    }))
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})