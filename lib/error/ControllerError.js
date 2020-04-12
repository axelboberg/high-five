/**
 * Axel Boberg © 2019
 */

module.exports = class RouterError extends Error {
  static get code () {
    return Object.freeze({
      'NOT_FOUND': 'NOT_FOUND'
    })
  }

  constructor (message, code, status) {
    super(message)
    this.name = 'ControllerError'
    this.code = code
    this.status = status
  }
}