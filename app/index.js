/**
 * Axel Boberg © 2019
 */

require('babel-polyfill')

const choo = require('choo')
const ssr = require('./ssr')

const stores = require('./stores')
const routes = require('./routes')

/**
 * Require static files
 */
require('./robots.txt')

require('./animations.css')
require('./style.scss')
require('./icons.css')

if (!module.parent) {
  const app = choo()

  /*
  Setup routes and stores
  */
  setup(app)

  app.mount('body')
} else {
  module.exports = () => {
    const app = choo()
    
    /*
    Setup routes and stores
    */
    setup(app)

    return app
  }
}

function setup (app) {
  stores(app)
  routes(app)

  /**
   * Wrap fetch and expect in a
   * single function on the state
   * @param { String } api The api to request
   * @param { String } loc The expected location on the state as dot notation
   * @param { Function? } trans A transformer function that will be applied to the response
   * @param { Object? } data Any payload data that will be sent in the request body
   */
  app.state.expect = (api, loc, trans, data) => {

    /*
    Fetch the data directly
    */
    if (typeof window !== 'undefined') {
      const opts = {
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(data)
      }
      return window.fetch(api, opts)
        .then(res => {
          if (!res.ok) throw res.json()
          return res.json()
        })
        .then(trans)
        .catch(err => app.state.error = err)
    }

    /*
    Register an expectation for
    the server to prefetch
    */
    ssr.expect(app.state.href || '/', loc, api, trans, data)
    return Promise.resolve()
  }

  app.state.serialize = obj => {
    return Object.entries(obj)
      .map(([key, val]) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val)
      })
      .join('&')
  }
}