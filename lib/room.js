/**
 * Axel Boberg © 2020
 */

const random = require('./random')

const ROOM_SIZE = 2

let _io
exports.setInstance = io => {
  _io = io
}

exports.rooms = () => {
  if (!_io) throw new Error('Socket io instance is not set')
  return _io.sockets.adapter.rooms
}

exports.new = async () => {
  const rand = await random.string(8)
  if (exports.rooms()[rand]) return exports.new()
  return rand
}

exports.join = (room, socket) => {
  const rooms = exports.rooms()
  if (rooms[room] && Object.keys(rooms[room].sockets).length === ROOM_SIZE) return

  /*
  Join the room
  */
  socket.join(room)

  return true
}