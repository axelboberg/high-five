/**
 * Axel Boberg © 2020
 */

const Handpose = require('@tensorflow-models/handpose')
// const tf = require('@tensorflow/tfjs')

/* const detect = require('./detect')
const model = require('./handopen.detect') */

/* console.log(tf.getBackend())

tf.setBackend('webgl')
  .then(res => {
    console.log(res)
    console.log(tf.getBackend())
  })
  .catch(err => console.error(err)) */

let model 

exports.predict = async (image, width, height) => {
  const opts = {
    detectionConfidence: 0.95
  }

  if (!model) {
    model = await Handpose.load(opts)
    postMessage({ cmd: 'load' })
  }

  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

  const prediction = await model.estimateHands(canvas, false)
  return parse(prediction[0], width, height)
}

/* exports.predict = async (image, width, height) => {
  if (!detector) {
    detector = new detect.detector(width, height, 1.1, model)
  }

  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

  return detector.detect(canvas, 1)[0]
} */

/* exports.predict = async (image, width, height) => {
  const opts = {
    detectionConfidence: 0.95
  }

  if (!model) {
    model = await tf.loadLayersModel('/public/model/model.json') */
/*     try {
      model = await tf.loadLayersModel('/public/model/model.json')
    } catch (_) {
      model = await Handpose.load(opts)
              await model.save('indexeddb://handpose')
    } */
/*   }

  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

  let data = tf.browser.fromPixels(canvas)
      data = tf.reshape(data, [ -1,416,416,3 ])
      data = tf.cast(data, 'float32')

  const prediction = await model.predict(data)
  return prediction
} */

function parse (data, width, height) {
  if (!data) return

  return {
    pos: {
      x: (-data.annotations.palmBase[0][0] + width / 2) / width,
      y: (-data.annotations.palmBase[0][1] + height / 2) / height
    },
    size: {
      width: (data.boundingBox.bottomRight[0] - data.boundingBox.topLeft[0]) / width,
      height: (data.boundingBox.bottomRight[1] - data.boundingBox.topLeft[1]) / height
    } 
  }
}