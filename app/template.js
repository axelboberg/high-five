/**
 * Axel Boberg © 2019
 */

const path = require('path')

/**
 * Override assets required by the client app
 */
const ignoreStyles = require('ignore-styles')
ignoreStyles.default(undefined, (module, filename) => {
  const ext = /(?:([^.]+))?$/.exec(filename)[0]

  /**
   * Return the path to the image
   * asset in the public directory
   * in order to provide the
   * correct source
   */
  if (['jpg', 'png', 'jpeg', 'svg'].includes(ext)) {
    module.exports = '/assets/' + path.basename(filename)
  }

  /**
   * CSS will be included with
   * asset-map
   */
  if (ext === 'css') return false
})

const app = require('./index')

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID

const ASSET_TEMPLATES = {
  'css': path => {
    return `<link rel="stylesheet" href="${path}" type="text/css">`
  },
  'js': path => {
    return `<script src="${path}" type="application/javascript" defer></script>`
  }
}

/**
 * Render an asset as an html-tag
 * @param { String } href
 * @returns { String } 
 */
function asset (href) {
  const ext = /(?:([^.]+))?$/.exec(href)[0]

  if (href.indexOf('worker') !== -1) return ''
  if (!ASSET_TEMPLATES[ext]) return ''
  return ASSET_TEMPLATES[ext](href)
}

module.exports = (route, opts = {}) => {
  const _app = app()

  /**
   * Render assets
   */
  const assets = (opts.assets || [])
    .map(asset)
    .join('')
  
  return `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <title>👋</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Make virtual high-fives">
        <meta name="keywords" content="high-five">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:title" content="High-Five"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://highfive.boberg.io"/>
        <meta property="og:description" content="Make virtual high-fives" />
        <base href="/">
        ${
          process.env.NODE_ENV === 'production' ?
          `
          <script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          </script>          
          ` :
          ''
        }
        <script>
          window.initialState = ${opts.state ? JSON.stringify(opts.state) : 'null'}
        </script>
        ${assets}
      </head>
      ${_app.toString(route, opts.state || {})}
    </html>
  `
}