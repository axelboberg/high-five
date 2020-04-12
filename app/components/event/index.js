/**
 * Axel Boberg © 2020
 */

const EventEmitter = require('events')
const Nanocomponent = require('nanocomponent')

module.exports = class EventComponent extends Nanocomponent {
  constructor (...args) {
    super(...args)
    this._emitter = new EventEmitter()

    this.on = this.on.bind(this)
    this.once = this.once.bind(this)
    this.emit = this.emit.bind(this)
  }

  on (event, handler) {
    return this._emitter.on(event, handler)
  }

  once (event, handler) {
    return this._emitter.once(event, handler)
  }

  emit (event, ...args) {
    return this._emitter.emit(event, ...args)
  }
}