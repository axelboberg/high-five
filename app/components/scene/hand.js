/**
 * Axel Boberg © 2020
 */

const Scene = require('./index')

const HIGHFIVE_DURATION = 1000

module.exports = class HandScene extends Scene {
  createElement (obj, width, height) {
    return super.createElement(obj, width, height, {
      class: ' Scene--hand' + (this.isHighfive ? ' is-highfive' : '')
    })
  }

  highfive () {
    if (!this.element) return

    this.isHighfive = true
    this.rerender()

    if (this._highfiveTimeout) {
      clearTimeout(this._highfiveTimeout)
    }

    this._highfiveTimeout = setTimeout (() => {
      this.isHighfive = false
      this.rerender()
    }, HIGHFIVE_DURATION)
  }
}