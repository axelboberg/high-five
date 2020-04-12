/**
 * Axel Boberg © 2020
 */

const Crypto = require('crypto')

exports.bytes = (l = 8) => {
  return Crypto.randomBytes(l)
}

exports.string = (l, map = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => {
  return Array.from(exports.bytes(l))
    .map(val => map[val % map.length])
    .join('')
}