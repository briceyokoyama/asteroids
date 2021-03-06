import MovingObject from './MovingObject.js'
import Canvas from '../utility/Canvas.js'
import key from 'keymaster'

export default class Ship extends MovingObject {
  constructor(position, velocity, color = 'orange', radius = 20) {
    super(position, velocity)
    this.direction = 0
    this.color = color
    this.radius = radius
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
    if (key.isPressed('left')) this.direction -= 3.14/75
    if (key.isPressed('right')) this.direction += 3.14/75

    this.velocity = this.velocity.add(this.getAcceleration())

    this.position = this.position.add(this.velocity)
    this.wrap()
  }

  getAcceleration() {
    if (key.isPressed('up')) {
      return {
        x: 0.2*Math.cos(this.direction),
        y: 0.2*Math.sin(this.direction)
      }
    } else if (key.isPressed('down')) {
      return {
        x: -0.2*Math.cos(this.direction),
        y: -0.2*Math.sin(this.direction)
      }
    }
    return {x: 0, y: 0}
  }

  shoot() {
    return new MovingObject(
      {
        x: this.position.x + (this.radius + 5)*Math.cos(this.direction),
        y: this.position.y + (this.radius + 5)*Math.sin(this.direction)
      },
      {
        x: 10*Math.cos(this.direction),
        y: 10*Math.sin(this.direction)
      },
      'yellow',
      2
    )
  }
}