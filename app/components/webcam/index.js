/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')
const EventComponent = require('../event')

require('./style.css')

module.exports = class Webcam extends EventComponent {
  get width () {
    return 200
  }

  get height () {
    return 112
  }

  createElement (state, emit) {
    this._videoEl = html`<video class="Webcam-preview" width="${this.width}" height="${this.height}"></video>`

    return html`
      <div class="Webcam">
        ${
          this._noCamAccess ?
          `Camera not available` :
          this._videoEl
        }
      </div>
    `
  }

  update () {
    return false
  }

  async load () {
    this._loaded = true
    try {
      this._stream = await this._getVideoStream()

      /*
      Setup the video preview
      */
      await this._setupVideoPreview(this._videoEl, this._stream)

      this.emit('load')
    } catch (err) {
      console.error(err)

      this._noCamAccess = true
      this.rerender()
    }
  }

  _getVideoStream () {
    return navigator.mediaDevices.getUserMedia({ video: { width: this.width, height: this.height } })
  }

  _setupVideoPreview (videoEl, stream) {
    return new Promise (resolve => {
      videoEl.srcObject = stream
      videoEl.addEventListener('loadedmetadata', () => {
        videoEl.play()
        return resolve()
      })
    })
  }

  getImageBitmap () {
    if (!this._loaded) return
    return createImageBitmap(this._videoEl, 0, 0, this.width, this.height)
  }
}