import { DrawingObject, XandY } from '../type';
import { getAbs } from '../lib/get-absolute';

export class FixedAccelerationSquare implements DrawingObject {
  private x: number;
  private y: number;
  private velocity: XandY;
  private acceleration: XandY;
  private color: string;
  private size: XandY;
  private lastRun: Date | undefined;

  constructor({
    acceleration,
    initial,
    size,
    color,
  }: {
    acceleration: XandY;
    initial: {
      position: XandY;
      speed: XandY;
    };
    size: XandY;
    color: string;
  }) {
    this.acceleration = acceleration;
    this.size = size;
    this.x = initial.position[0];
    this.y = initial.position[1];
    this.velocity = initial.speed;
    this.color = color;
  }

  nextFrame() {
    if (this.lastRun) {
      const now = new Date();
      const [oldSpeedX, oldSpeedY] = this.velocity;
      const timeDiff = (now.getTime() - this.lastRun.getTime()) / 1000;
      this.velocity = [
        timeDiff * this.acceleration[0] + oldSpeedX,
        timeDiff * this.acceleration[1] + oldSpeedY,
      ];
      this.x += 0.5 * (this.velocity[0] + oldSpeedX) * timeDiff;
      this.y += 0.5 * (this.velocity[1] + oldSpeedY) * timeDiff;
      this.lastRun = now;
    } else {
      this.lastRun = new Date();
    }
  }

  pause() {
    this.lastRun = undefined;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size[0], this.size[1]);
    ctx.font = '24px sans serif';
    ctx.fillText(`${Math.round(getAbs(this.velocity))} m/s`, this.x, this.y);
  }
}
