/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

require('./style.css')

module.exports = class Target extends Nanocomponent {
  createElement (image, heading, text) {
    this._snapshot = JSON.stringify(arguments)

    return html`
      <div class="Target">
        <div class="Target-image" style="background-image: url('${image}');"></div>
        <div class="Target-content">
          <h3 class="Target-heading">${heading}</h3>
          <p>
            ${text}
          </p>
        </div>
      </div>
    `
  }

  update (image, heading, text) {
    return this._snapshot !== JSON.stringify(arguments)
  }
}