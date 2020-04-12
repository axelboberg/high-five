/**
 * Axel Boberg © 2020
 */

const SocketIO = require('socket.io')

let instance

exports.setup = server => {
  instance = SocketIO(server)
}

exports.getInstance = () => {
  if (!instance) throw new Error('Socket has not been setup')
  return instance
}