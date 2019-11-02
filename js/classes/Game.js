import Canvas from "../utility/Canvas.js";
import MovingObject from "./MovingObject.js";

export default class Game {
  constructor() {
    this.asteroids = [];

    for (let i = 0; i < 5; i++) {
      this.asteroids.push(MovingObject.createRandom())
    }
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.tick = this.tick.bind(this);
  }

  move() {
    this.asteroids.forEach(asteroid => asteroid.move());
  }

  draw() {
    this.asteroids.forEach(asteroid => asteroid.draw());
  }

  tick() {
    Canvas.clear()
    this.move();
    this.draw();
    requestAnimationFrame(this.tick);
  }

  start() {

  }
}