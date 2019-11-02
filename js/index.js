import MovingObject from '/js/classes/MovingObject.js';

const { requestAnimationFrame } = window;

const movingObject = new MovingObject();

function tick() {
  movingObject.move();
  movingObject.draw();
  requestAnimationFrame(tick);
}

tick();