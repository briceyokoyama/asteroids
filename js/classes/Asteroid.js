import MovingObject from './MovingObject.js'

export default class Asteroid extends MovingObject {
  constructor(position, velocity, generation = 1, radius = 20) {
    super(position, velocity)
    this.generation = generation
    this.radius = radius
  }

  static createAtEdge() {
    const position = {
      x: 20,
      y: Math.random()*500
    }
    const velocity = {
      x: Math.random()*2,
      y: Math.random()*4 - 2
    }

    return new Asteroid(position, velocity)
  }

  handleCollision() {
    if (this.hit) {
      if (this.generation < 3) {
        let asteroids = []
        
        for (let i = 0; i < 3; i++) {
          asteroids.push(new Asteroid(
            this.position,
            {
              x: Math.random()*2,
              y: Math.random()*4 - 2
            },
            this.generation + 1,
            this.radius/2
          ))
        }
        return asteroids
      } else {
        return undefined
      }
    }
    return this
  }
}