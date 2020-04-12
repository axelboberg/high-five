/**
 * Axel Boberg © 2020
 */

const room = require('./room')

exports.setInstance = io => {
  io.on('connection', socket => {
    let curRoom

    socket.on('room:join', _room => {
      if (!room.join(_room, socket)) {
        socket.emit('_error', { message: 'Room is full', code: 'ROOM_FULL' })
        return
      }
      curRoom = _room
      socket.emit('status', { room: _room })
    })

    socket.on('pos', _pos => {
      if (!curRoom) return
      socket.to(curRoom).emit('pos', _pos)
    })
  })
}