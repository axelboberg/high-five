/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')

const Webcam = require('../components/webcam')
const webcam = new Webcam()

const Scene = require('../components/scene/hand')
const scene = new Scene()

const Message = require('../components/message')
const loadingMessage = new Message()
const chromeMessage = new Message()

const Header = require('../components/header')
const header = new Header()

const Hand = require('../models/Hand')

const sceneData = require('../assets/scene.json')

module.exports = (state, emit) => {
  if ((!state.params.room || state.params.room.length === 0) && typeof window !== 'undefined') {
    window.location.reload()
  }

  if (typeof window !== 'undefined') {
    const worker = new Worker(`./${state.meta.hash}.worker.bundle.js`)

    async function predict () {
      const bitmap = await webcam.getImageBitmap()
      worker.postMessage({ cmd: 'predict', image: bitmap, width: webcam.width, height: webcam.height })
    }
  
    webcam.on('load', () => {
      if (typeof window !== 'undefined' && window.chrome) predict()
    })
  
    worker.onmessage = e => {
      switch (e.data.cmd) {
        case 'predict':
          loadingMessage.hide()
          updateOwnHand(e.data.data)
          window.requestAnimationFrame(() => predict())
          break

        case 'load':
          console.info(`🤖 Making predictions`)
          break
      }
    }
  }

  const hands = []

  if (state.socket && typeof window !== 'undefined') {
    state.socket.on('status', ({ room }) => {
      console.info(`⚡️ Connected to room ${room}`)
    })

    if (state.params.room) {
      state.socket.emit('room:join', state.params.room)
    }

    state.socket.on('pos', data => {
      const { pos, size } = data
  
      const x = -pos.x * (window.innerWidth / 100),
            y = pos.y * (window.innerHeight / 100),
            z = (size.height - 0.5) * (window.innerHeight / 200)

      hands[1].position = [ x, y, z ]
    })
  }

  function updateOwnHand (data) {
    if (!data) return

    const { pos, size } = data

    const x = pos.x * (window.innerWidth / 100),
          y = pos.y * (window.innerHeight / 100),
          z = (-size.height + 0.5) * (window.innerHeight / 200)

    hands[0].position = [ x, y, z ]

    if (hands[0].isCollidingWith(hands[1])) {
     
      const MIN_VELOCITY = 3

      /*
      Check the velocity of the hands to make sure that they
      are approaching eachother in the correct orientation
      and that at a minimum speed
      */
      if (hands[0].velocity[0] < hands[1].velocity[0] ||
          hands[0].velocity[0] < MIN_VELOCITY) return

      scene.highfive()
    }

    emit('socket:emit', 'pos', data)
  }

  scene.on('load', _scene => {
    const cam = _scene.getObjectByName('camera-1')
    scene.camera = cam

    /*
    Find the hand-objects and make references
    to them in order to change their positions
    */
    hands[0] = new Hand(_scene.getObjectByName('hand-my', true))
    hands[0].size = [ 1, 1, 1 ]

    hands[1] = new Hand(_scene.getObjectByName('hand-their', true))
    hands[1].size = [ 1, 1, 1 ]
  })

  scene.on('frame', (scene, renderer, cam) => {
    cam.aspect = window.innerWidth / window.innerHeight
    
    cam.position.z = 6
    cam.position.y = 0
    cam.position.x = -1

    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return html`
    <div class="View--fullscreen">
      ${header.render(state, emit)}
      ${
        typeof window !== 'undefined' && !window.chrome ? chromeMessage.render(html`
          <div>
            <div class="u-margin--tb--40 u-text-align--center u-heading--2">
              <span data-icon="chrome" data-icon-size="1em"></span>
            </div>
            <div class="u-margin--tb--40 u-text-align--center">
              This experiment requires Google Chrome,<br>
              however, you can still <a href="/about" target="_blank" rel="noopener noreferrer">read the story behind this page</a>
            </div>
          </div>
        `) : 
        loadingMessage.render(html`
          <div>
            <div class="u-margin--tb--40 u-text-align--center u-heading--2 u-animation--periodic-wave u-transform-origin--emoji-palm--small">👋</div>
            <div class="u-margin--tb--40 u-text-align--center">
              Hang tight while the model loads.<br>
              In the meantime, <a href="/about" target="_blank" rel="noopener noreferrer">read the story behind this page</a>
            </div>
          </div>
        `)
      }
      ${typeof window === 'undefined' ? '' : [
        webcam.render(),
        scene.render(sceneData, window.innerWidth, window.innerHeight)
      ]}
    </div>
  `
}