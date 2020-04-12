/**
 * Axel Boberg © 2020
 */

const renderer = require('./renderer')

/**
 * Declare all routes with their
 * respective path and view
 */
const ROUTES = {
  '/': renderer(require('./views/home')),
  '/about': renderer(require('./views/about')),
  '/:room': renderer(require('./views/home'))
}

module.exports = app => {
  for (let route in ROUTES) {
    app.route(route, ROUTES[route])
  }
}
