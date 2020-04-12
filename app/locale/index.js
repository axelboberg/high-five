/**
 * Axel Boberg © 2018
 */

/**
 * A module handling localization of strings
 */

const DEFAULT_LANG = 'en-US'

const languages = {
  'en-US': require('./en-us.json')
}

/**
 * Replace placeholders in a string with other strings,
 * each placeholder should be marked with the provided separator
 *
 * @param {String} template A template string containing placeholders
 * @param {Array} parameters An ordered array placeholder replacements
 * @param {String} separator A separator string declaring placeholders
 * @returns {String} The final parsed string
 */
function replacePlaceholders (template = '', parameters = [], separator = '%') {
  // Split the template string on every separator occurance and
  // loop through all parts, appending the new strings.
  const parts = template.split(separator)
    .map((part, i) => {
      return part + String(parameters[i] || '')
    })

  // Return the raw template if
  // no separators were found
  if (parts.length === 1) {
    return template
  }

  return parts.join('')
}

/**
 * Get a localized string in a target language,
 * with or without parameters to replace placeholders
 *
 * @param {String} targetLang The target language
 * @param {String} text The string to localize
 * @param {Array} parameters An ordered array of placeholder replacements
 * @param {String} separator The string used to declare placeholders
 * @returns {String} The localized string
 */
module.exports = function (targetLang = DEFAULT_LANG, text, parameters = [], separator = '%') {
  if (!DEFAULT_LANG || !languages[DEFAULT_LANG]) throw new Error('Missing default language')

  const lang = targetLang

  // Verify that the target language is loaded,
  // if so, lookup the string
  let localized = languages[lang] ? languages[lang][text] : null

  // Use the default language if no localization was found
  if (!localized) localized = languages[DEFAULT_LANG][text]

  // If no localization was found in the default language,
  // use the input string
  if (!localized) localized = text

  // Replace the localized string's placeholders and return
  return replacePlaceholders(localized, parameters, separator)
}

module.exports.languages = Object.keys(languages)
module.exports.default = DEFAULT_LANG