/**
 * Axel Boberg © 2019
 */

const ssr = require('../../app/ssr')
const assets = require('../../assets.json')
const template = require('../../app/template')

const room = require('../room')

/**
 * Populate a target object with data that
 * the client application expects for a
 * certain route
 * 
 * @param { Object } req
 * @param { Object } target 
 * @param { String } route 
 * @param { Function } render 
 * @returns { Promise<Object> }
 */
async function populate (req, target, route, render) {
  if (!ssr.expecations(route)) render(route)

  const expectations = ssr
    .expecations(route)
    .map (({ id, data, location, transformation }) => {
      return req.router.execute(id, { ...req, body: data })
        .then(data => {
          ssr.insert(target, location, transformation(data))
        })
    })

  await Promise.all(expectations)
  return target
}

/**
 * Render the client application as HTML
 *
 * @param { Object } req
 * @param { String } route The route, including any query-parameters, to render
 * @param { Object } state 
 * @returns { Promise<String> }
 */
async function render (req, route, state = {}) {
  /*
    Wrap template to include
    state for pre-rendering
  */
  function preRender (route) {
    return template(route, { state: state })
  }

  await populate(req, state, route, preRender)
  return template(route, {
    state: state,
    assets: assets.assets
  })
}

/**
 * A convenience function for rendering
 * the application from only the request-object
 */
function adapter (req) {
  /**
   * The url passed to render will be
   * forwarded to choo.toString which
   * means that it must contain any
   * query-parameters.
   * 
   * Therefore, use 'req.originalUrl'
   * instead of 'req.baseUrl' for
   * the render-function.
   */
  return render(req, req.originalUrl, {
    meta: {
      version: process.env.npm_package_version,
      hash: assets.hash
    },
    router: {
      query: req.query,
      url: req.originalUrl
    },
    lang: 'en-US',
    error: req.error
  })
    .then(html => {
      /**
       * Clear expectations for the current route
       * in order to avoid memory leaks
       * when routes are to specific
       */
      ssr.clear(req.originalUrl)

      // Reset error parameter
      req.error = null

      return {
        /**
         * Remove any newlines
         * for easthetic purposes
         */
        '$raw': html.split('\n').join('')
      }
    })
}

async function makeRoom (req, then) {
  if (req.params.room && req.params.room.length > 0) return then(req)
  const _room = await room.new()

  return { $redirect: `/${_room}` }
}

module.exports = {
  ':room': {
    'get': req => makeRoom(req, adapter)
  },
  '*': {
    'get': req => makeRoom(req, adapter)
  }
}