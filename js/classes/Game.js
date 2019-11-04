import Canvas from '../utility/Canvas.js'
import MovingObject from './MovingObject.js'
import Ship from './ship.js'

const MIN_ASTEROIDS = 100

export default class Game {
  constructor() {
    this.asteroids = []
    this.ship = new Ship({x: 250, y: 250}, {x: 0, y: 0})

    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this.tick = this.tick.bind(this)
    this.removeOutOfBounds = this.removeOutOfBounds.bind(this)
    this.repopulateAsteroids = this.repopulateAsteroids.bind(this)
  }

  move() {
    this.ship.move()
    this.asteroids.forEach(asteroid => asteroid.move())
  }

  draw() {
    this.ship.draw()
    this.asteroids.forEach(asteroid => asteroid.draw())
  }

  tick() {
    Canvas.clear()
    this.move()
    this.draw()
    this.removeOutOfBounds()
    this.repopulateAsteroids()
    requestAnimationFrame(this.tick)
  }

  start() {

  }

  removeOutOfBounds() {
    this.asteroids = this.asteroids.filter(asteroid => !asteroid.outOfBounds())
  }

  repopulateAsteroids() {
    while (this.asteroids.length < MIN_ASTEROIDS) {
      this.asteroids.push(MovingObject.createAtEdge())
    }
  }
}