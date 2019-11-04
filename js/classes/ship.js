import MovingObject from './MovingObject.js'
import Canvas from '../utility/Canvas.js'
import key from 'keymaster'

export default class Ship extends MovingObject {
  constructor(position, velocity) {
    super(position, velocity)
    this.direction = 0
    this.color = 'orange'

    this.move = this.move.bind(this)
  }

  draw() {
    Canvas.drawCircle({
      x: this.position.x,
      y: this.position.y,
      color: this.color,
      radius: this.radius
    })
    Canvas.drawCircle({
      x: this.position.x + (this.radius + 5)*Math.cos(this.direction),
      y: this.position.y + (this.radius + 5)*Math.sin(this.direction),
      color: this.color,
      radius: 5
    })
  }

  move() {
    if (key.isPressed('left')) this.direction -= 3.14/150
    if (key.isPressed('right')) this.direction += 3.14/150
    
    const { x: deltaX, y: deltaY } = this.getAcceleration()

    this.velocity.x += deltaX
    this.velocity.y += deltaY

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.wrap()
  }

  getAcceleration() {
    if (key.isPressed('up')) {
      return {
        x: 0.2*Math.cos(this.direction),
        y: 0.2*Math.sin(this.direction)
      }
    }
    return {x: 0, y: 0}
  }
}