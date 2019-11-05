import Canvas from '../utility/Canvas.js'
import Vec2 from '../classes/Vec2.js'

export default class MovingObject {
  constructor(position, velocity) {
    this.position = new Vec2(position)
    this.velocity = new Vec2(velocity)
    this.radius = 20
  }

  static createAtEdge() {
    const position = {
      x: 20,
      y: Math.random()*500
    }
    const velocity = {
      x: Math.random()*5,
      y: Math.random()*10 - 5
    }

    return new MovingObject(position, velocity)
  }

  move() {
    this.position = this.position.add(this.velocity)
  }

  draw() {
    Canvas.drawCircle({ x: this.position.x, y: this.position.y, radius: this.radius })
  }

  outOfBounds() {
    return this.outOfBoundsDirection()
  }

  outOfBoundsDirection() {
    if (this.position.x + this.radius > Canvas.width()) return 'E'
    if (this.position.x - this.radius < 0) return 'W'
    if (this.position.y + this.radius > Canvas.height()) return 'S'
    if (this.position.y - this.radius < 0) return 'N'
    return false
  }

  wrap() {
    const outOfBoundsDirection = this.outOfBounds()

    if (!outOfBoundsDirection) return

    switch (outOfBoundsDirection) {
    case 'N':
      this.position.y = Canvas.height() - this.radius
      break
    case 'S':
      this.position.y = this.radius
      break
    case 'E':
      this.position.x = this.radius
      break
    case 'W':
      this.position.x = Canvas.width() - this.radius
      break
    default:
      break
    }

  }
}