/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

require('./style.css')

module.exports = class Message extends Nanocomponent {
  createElement (contents) {
    return html`
      <div class="Message--fullscreen ${this._isHidden ? 'is-hidden' : ''}">
        <div>
        ${contents}
        </div>
      </div>
    `
  }

  update () {
    return true
  }

  hide () {
    this._isHidden = true
    if (this.element) {
      this.rerender()
    }
  }
}