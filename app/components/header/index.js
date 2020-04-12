/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

require('./style.css')

module.exports = class Header extends Nanocomponent {
  createElement (state, emit) {
    const link = typeof window !== 'undefined' ?
                 window.location.href :
                 ''

    return html`
      <header class="Header">
        <div>
          Invite a friend by sharing the link<br>
          <a href="${link}">${link}</a>
        </div>
        <div>
          <a href="/about" target="_blank" rel="noopener noreferrer" class="u-color--light">👨‍💻 About the experiment</a>
        </div>
      </header>
    `
  }

  update () {
    return true
  }
}