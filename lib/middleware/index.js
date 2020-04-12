/**
 * Axel Boberg © 2019
 */

const MIDDLEWARE = [
  require('./setup'),
  require('./router')
]

module.exports = app => {
  for (let middleware of MIDDLEWARE) {
    middleware(app)
  }
}