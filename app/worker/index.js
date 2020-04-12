/**
 * Axel Boberg © 2020
 */

require('babel-polyfill')
const handpose = require('./handpose')

const MESSAGE_ROUTER = {
  'predict': data => handpose.predict(data.image, data.width, data.height)
}

self.onmessage = async e => {
  if (!MESSAGE_ROUTER[e.data.cmd]) return

  const res = await MESSAGE_ROUTER[e.data.cmd](e.data)
  postMessage({ cmd: e.data.cmd, data: res })
}