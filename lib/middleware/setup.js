/**
 * Axel Boberg © 2019
 */

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const ControllerError = require('../error/ControllerError')

module.exports = app => {
  /*
  Enforce SSL
  */
  if (process.env.NODE_ENV !== 'development') {
    app.use((req, res, next) => {
      if (req.secure) return next()

      if (req.method === 'GET') {
        return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`)
      }

      const err = new ControllerError('Requests must be made over HTTPS', ControllerError.codes.NOT_SECURE, 403)
      return next(err)
    })
  }

  /*
  Body-parser
  */
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  
  /*
  Express settings
  */
  app.disable('x-powered-by')
  if (process.env.NODE_ENV !== 'development') {
    app.set('trust proxy', true)
  }

  /*
  Static files
  */
  app.use(express.static(path.join(__dirname, '../../dist')))

  app.get('/favicon.ico', (req, res, next) => {
    res.status(404).end()
    next()
  })
}