import MovingObject from './MovingObject.js'
import Canvas from '../utility/Canvas.js'

export default class Ship extends MovingObject {
  constructor(position, velocity) {
    super(position, velocity)
    this.direction = 3.14/2
    this.color = 'orange'
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
}