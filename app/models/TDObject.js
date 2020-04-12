/**
 * Axel Boberg © 2020
 */

module.exports = class TDObject {

  /**
   * Create a new Hand
   * @param { THREE.Object3D } modelObject A reference to the ThreeJs object
   */
  constructor (modelObject) {
    if (!modelObject) throw new Error('No model object provided')

    this._modelObject = modelObject
    this._lastUpdate = undefined
  }

  get velocity () {
    return this._velocity || [ 0, 0, 0 ]
  }

  set position (pos) {
    if (!Array.isArray(pos)) {
      throw new TypeError('Position must be an array of [ x, y, z ]')
    }

    const [ x, y, z ] = pos

    const curPos = this.position,
          curUpd = this._lastUpdate

    const dt = (Date.now() - curUpd) / 1000

    this._velocity = [
      (curPos[0] - x) / dt,
      (curPos[1] - y) / dt,
      (curPos[2] - z) / dt
    ]

    this._lastUpdate = Date.now()
    this._position = [ x, y, z ]

    this._modelObject.position.x = x
    this._modelObject.position.y = y
    this._modelObject.position.z = z
  }

  get position () {
    return this._position || [ 0, 0, 0 ]
  }

  set size (size) {
    if (!Array.isArray(size)) {
      throw new TypeError('Size must be an array of [ w, h, d ]')
    }

    this._size = size
  }

  get size () {
    return this._size || [ 0, 0, 0 ]
  }

  get modelObject () {
    return this._modelObject
  }

  /**
   * Check if this object is colliding
   * with another object in 3D space
   * based on their bounding boxes
   * @param { TDObject } anotherObject 
   * @returns { Boolean }
   */
  isCollidingWith (anotherObject) {
    if (!Array.isArray(anotherObject.position)) {
      throw new TypeError('Unable to read position from object, are you sure it\'s a TDObject?')
    }

    const [ x, y, z ] = this.position,
          [ w, h, d ] = this.size

    const [ ax, ay, az ] = anotherObject.position,
          [ aw, ah, ad ] = anotherObject.size

    return (x <= ax + aw && x + w >= ax) &&
           (y <= ay + ah && y + h >= ay) &&
           (z <= az + ad && z + d >= az)
  }
}