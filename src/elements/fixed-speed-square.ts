import { DrawingObject, XandY } from '../type';
import { getAbs } from '../lib/get-absolute';

export class FixedSpeedSquare implements DrawingObject {
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private color: string;
  private velocity: XandY;
  private lastRun: Date | undefined;

  constructor(
    { width, height },
    [x, y]: XandY,
    velocity: XandY,
    color = 'blue'
  ) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.color = color;
    this.lastRun = undefined;
  }

  nextFrame() {
    if (this.lastRun) {
      const now = new Date();
      const secPassed = (now.getTime() - this.lastRun.getTime()) / 1000;
      this.x += this.velocity[0] * secPassed;
      this.y += this.velocity[1] * secPassed;
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
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = '24px sans serif';
    ctx.fillText(`${getAbs(this.velocity)} m/s`, this.x, this.y);
  }
}
