import "./styles.css";

class PhysicalObject {
  constructor(
    { width, height },
    [x, y],
    [speedX, speedY] = [],
    color = "blue"
  ) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.xSpeed = speedX;
    this.ySpeed = speedY;
    this.color = color;
    this.lastRun = undefined;
  }

  nextFrame() {
    if (this.lastRun) {
      const now = new Date();
      const secPassed = (now - this.lastRun) / 1000;
      this.x += this.xSpeed * secPassed;
      this.y += this.ySpeed * secPassed;
      this.lastRun = now;
    } else {
      this.lastRun = new Date();
    }
  }
}

class Scenario {
  constructor(ctx, { width, height }) {
    this.objects = [];
    this._ctx = ctx;
    this._width = width;
    this._height = height;
  }

  addObject(object) {
    this.objects.push(object);
  }

  tick() {
    this._ctx.clearRect(0, 0, this._width, this._height);
    this.objects.forEach(object => {
      this._ctx.fillStyle = object.color;
      this._ctx.fillRect(object.x, object.y, object.width, object.height);

      object.nextFrame();
    });
  }

  run() {
    this.tick();

    window.requestAnimationFrame(() => this.run());
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function runScenario() {
  const scenario = new Scenario(ctx, {
    width: canvas.width,
    height: canvas.height
  });

  [
    [5, 5, 20, 20, 0.5, 0],
    [5, 5, 450, 20, -0.5, 0],
    [5, 5, 20, 20, 0.5, 0.5, "red"]
  ].forEach(([width, height, x, y, speedX, speedY, color]) => {
    scenario.addObject(
      new PhysicalObject(
        {
          width,
          height
        },
        [x, y],
        [speedX, speedY],
        color
      )
    );
  });

  scenario.run();
}

function restart() {
  runScenario();
}

document.getElementById("restart-btn").addEventListener("click", restart);
