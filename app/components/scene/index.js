/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')
const EventComponent = require('../event')
const Three = require('three')

require('./style.css')

module.exports = class Scene extends EventComponent {
  get renderer () {
    return this._renderer
  }

  get scene () {
    return this._scene
  }

  set camera (val) {
    this.__camera = val
  }

  get camera () {
    return this.__camera || this._camera
  }

  createElement (obj, width, height, attr = {}) {
    this._setup(obj, width, height)

    if (!attr.class) attr.class = ''
    attr.class = 'Scene' + attr.class

    return html`
      <div ${attr}>
        ${this._renderer.domElement}
      </div>
    `
  }

  update () {
    return false
  }

  _setup (obj, width, height) {
    if (this._scene) return

    this._scene = new Three.Scene()
    this._camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000)
    this._renderer = new Three.WebGLRenderer({ alpha: true })
    this._renderer.setSize(width, height)
    this._renderer.setClearColor(0x000000, 0)

    if (obj) {
      const loader = new Three.ObjectLoader()
      const item = loader.parse(obj)
      this._scene.add(item)
    }
  }

  _frame () {
    if (!this._isRunning) return

    this.emit('frame', this.scene, this.renderer, this.camera)

    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => this._frame())
  }

  load () {
    if (this._isRunning) return
    this._isRunning = true
    this._frame()

    this.emit('load', this.scene)
  }
}