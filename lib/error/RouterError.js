/**
 * Axel Boberg © 2019
 */

module.exports = class RouterError extends Error {
  constructor (message, code, status) {
    super(message)
    this.name = 'RouterError'
    this.code = code
    this.status = status
  }
}