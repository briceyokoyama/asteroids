import Canvas from '../utility/Canvas.js'

export default class MovingObject {
  constructor(position, velocity) {
    this.position = position
    this.velocity = velocity
    this.radius = 20;
  }

  static createRandom() {
    const position = {
      x: Math.random()*500 + 0.1,
      y: Math.random()*500 + 0.1,
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
    Canvas.drawCircle({ x: this.position.x, y: this.position.y, radius: this.radius })
  }

  outOfBounds() {
    return (
      this.position.x + this.radius >= Canvas.width()
      || this.position.x - this.radius <= 0
      || this.position.y - this.radius <= 0
      || this.position.y + this.radius >= Canvas.height()
    )
  }
}