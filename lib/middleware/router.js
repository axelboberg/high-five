/**
 * Axel Boberg © 2019
 * 
 * Express-middleware for adapting the object-router
 * and the policy agent since the route should
 * be resolved before checking the policy in order 
 * to be able to return a 404-error if not found
 */

const RouterError = require('../error/RouterError')
const Request = require('../classes/Request')

const routes = require('../routes')
const Router = require('obj-router')
const router = new Router(routes)

/**
 * Commands that routes can return
 * as keys in their response to
 * trigger certain actions
 */
const COMMANDS = {
  $redirect: (req, res, next, val) => res.redirect(val),
  $reload: (req, res, next, val) => res.redirect(req.originalUrl),
  $next: (req, res, next, val) => next(),
  $raw: (req, res, next, val) => res.send(val),
  $continue: (req, res, next, val) => {
    if (req.accepts('html') &&
        req.query.continue &&
        !/http(s)?:\/\//.test(req.query.continue)) {
      return res.redirect(req.query.continue)
    } else {
      return res.json({ 'status': 'OK' })
    }
  }
}

module.exports = app => {
  /**
   * Attach the object-router to express
   */
  app.use('*', async (req, res, next) => {
    const _req = new Request(req)
    _req.router = router
    
    /*
      Resolve the endpoint
    */
    const endpoint = router.resolve(req.originalUrl, _req)
    if (typeof endpoint !== 'function') {
      // 404 Not Found
      return next(new RouterError('Not Found', 'NOT_FOUND', 404))
    }

    /**
     * Execute the resolved function,
     * which represents the endpoint itself
     * 
     * Catch all its errors and forward them
     * to the handler
     */
    let _res
    try {
      _res = await endpoint(_req)
    } catch(err) {
      return next(err)
    }

    /**
     * Handle any optional commands, see
     * 'COMMANDS' at the top of this file
     */
    if (typeof _res === 'object') {
      for(let cmd in COMMANDS) {
        if (_res[cmd]) return COMMANDS[cmd](_req, res, next, _res[cmd])
      }
    }

    return res.send(_res)
  })
}