/**
 * Axel Boberg © 2020
 */

const Handpose = require('@tensorflow-models/handpose')
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