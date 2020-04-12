/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')

module.exports = view => {
  return (state, emit) => {
    const renderedView = view(state, emit)

    if (state.error) console.error(state.error)

    return html`
      <body>
        ${renderedView}
      </body>
    `
  }
}
