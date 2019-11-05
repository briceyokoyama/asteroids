import Canvas from '../utility/Canvas.js'
import Vec2 from '../classes/Vec2.js'

export default class MovingObject {
  constructor(position, velocity, color = 'white', radius) {
    this.position = new Vec2(position)
    this.velocity = new Vec2(velocity)
    this.color = color
    this.radius = radius
    this.hit = false
  }

  move() {
    this.position = this.position.add(this.velocity)
  }

  draw() {
    Canvas.drawCircle({ x: this.position.x, y: this.position.y, radius: this.radius, color: this.color })
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

  isCollidedWith(otherMovingObject) {
    return (this.radius + otherMovingObject.radius) >= this.position.distance(otherMovingObject.position)
  }

  handleCollision() {
    if (this.hit) return undefined
    return this
  }

}