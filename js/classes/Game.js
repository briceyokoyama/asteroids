import Canvas from '../utility/Canvas.js'
import MovingObject from './MovingObject.js'
import Ship from './ship.js'
import key from 'keymaster'

const MIN_ASTEROIDS = 10

export default class Game {
  constructor() {
    this.asteroids = []
    this.ship = new Ship({x: 250, y: 250}, {x: 0, y: 0})
    this.bullets = []
    
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this.tick = this.tick.bind(this)
    this.removeOutOfBounds = this.removeOutOfBounds.bind(this)
    this.repopulateAsteroids = this.repopulateAsteroids.bind(this)
    this.checkCollisions = this.checkCollisions.bind(this)
    this.handleCollisions = this.handleCollisions.bind(this)
    this.bindHandlers = this.bindHandlers.bind(this)
    this.bindHandlers()
  }

  move() {
    this.ship.move()
    this.asteroids.forEach(asteroid => asteroid.move())
    this.bullets.forEach(bullet => bullet.move())
  }

  draw() {
    this.ship.draw()
    this.asteroids.forEach(asteroid => asteroid.draw())
    this.bullets.forEach(bullet => bullet.draw())
  }

  tick() {
    Canvas.clear()
    this.move()
    this.draw()
    this.removeOutOfBounds()
    this.repopulateAsteroids()
    this.checkCollisions()
    this.handleCollisions()
    requestAnimationFrame(this.tick)
  }

  start() {

  }

  removeOutOfBounds() {
    this.asteroids = this.asteroids.filter(asteroid => !asteroid.outOfBounds())
    this.bullets = this.bullets.filter(bullet => !bullet.outOfBounds())
  }

  repopulateAsteroids() {
    while (this.asteroids.length < MIN_ASTEROIDS) {
      this.asteroids.push(MovingObject.createAtEdge())
    }
  }

  bindHandlers() {
    key('space', () => {
      this.bullets.push(this.ship.shoot())
    })
  }

  checkCollisions() {
    this.asteroids.forEach(asteroid => {
      this.bullets.forEach(bullet => {
        if (asteroid.isCollidedWith(bullet)) {
          asteroid.hit = true
          bullet.hit = true
        }
      })
    })
  }

  handleCollisions() {
    this.asteroids = this.asteroids.filter(asteroid => !asteroid.hit)
    this.bullets = this.bullets.filter(bullet => !bullet.hit)
  }

}