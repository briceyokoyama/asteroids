import Canvas from '../utility/Canvas.js'

export default class MovingObject {
  constructor(position, velocity) {
    this.position = position
    this.velocity = velocity
  }

  static createRandom() {
    const position = {
      x: Math.random()*500,
      y: Math.random()*500,
    }
    const velocity = {
      x: Math.random()*10 - 5,
      y: Math.random()*10 - 5,
    }

    return new MovingObject(position, velocity)
  }

  move() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw() {
    Canvas.drawCircle({ x: this.position.x, y: this.position.y, radius: 20 })
  }
}