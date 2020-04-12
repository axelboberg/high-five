/**
 * Axel Boberg © 2020
 */

const socket = require('socket.io-client')()

module.exports = (state, emitter) => {
  state.socket = socket

  socket.on('_error', err => {
    state.error = err
    emitter.emit('render')
  })

  emitter.on('socket:emit', (event, val) => {
    if (typeof window === 'undefined') return
    socket.emit(event, val)
  })

  emitter.on('socket:on', (event, handler) => {
    if (typeof window === 'undefined') return
    socket.on(event, handler)
  })
}