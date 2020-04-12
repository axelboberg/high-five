/**
 * Axel Boberg © 2019
 */

const DEFAULT_LANG = 'en-US'

/**
 * Create a basic request-object
 * from a source object
 * @param { Object? } src 
 */
function Request (src = { method, baseUrl }) {

  // Copy the whole object
  Object.assign(this, src)

  // Declare default properties
  this.method = src.method ? src.method.toLowerCase() : 'get'
  this.path = src.path ? src.path : ''
  this.baseUrl = src.baseUrl.length === 0 ? '/' : src.baseUrl
  this.param = {}
  this.query = {}
  this.ip = src.ip
  this.get = src.get
  this.accepts = src.accepts
  this.session = src.session
  this.prismic = src.prismic
  
  /**
   * Parse the accept-language header
   */
  this.lang = (function () {
    const raw = src.get('accept-language') || ''

    const langs = raw
      .split(',')

      /**
       * Strip any quality-value syntax
       * from the language string
       * 
       * Example:
       * 'sv-SE;q=0.9' becomes 'sv-SE'
       */
      .map(lang => {
        if (!lang.indexOf(';q=')) return lang
        return lang.split(';q=')[0]
      })

      /**
       * Extract only the language code from the
       * language string, which may include subtags
       * 
       * Example:
       * 'sv-SE' becomes 'sv'
       */
      .map(lang => {
        if (!lang.indexOf('-')) return lang
        return lang.split('-')[0]
      })

    return langs[0] || DEFAULT_LANG
  })()
}

module.exports = Request