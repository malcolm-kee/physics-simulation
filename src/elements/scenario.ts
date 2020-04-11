import { DrawingObject } from '../type';

export class Scenario {
  private objects: DrawingObject[];
  private _ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;
  private _width: number;
  private _height: number;
  private _gridLine: number;
  private _rafId: number;

  constructor(canvas: HTMLCanvasElement, { width, height }, gridLine = 10) {
    this.objects = [];
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._width = width;
    this._height = height;
    this._gridLine = gridLine;
  }

  addObject(object: DrawingObject): void {
    this.objects.push(object);
  }

  tick(): void {
    this._ctx.clearRect(0, 0, this._width, this._height);
    this.objects.forEach((object) => {
      object.render(this._ctx);
      object.nextFrame();
    });

    const gridWidth = this._width / this._gridLine;
    const gridHeight = this._height / this._gridLine;
    this._ctx.beginPath();
    for (let i = 0; i <= this._width; i += gridWidth) {
      this._ctx.moveTo(i, 0);
      this._ctx.lineTo(i, this._height);
    }
    for (let j = 0; j <= this._height; j += gridHeight) {
      this._ctx.moveTo(0, j);
      this._ctx.lineTo(this._width, j);
    }
    this._ctx.strokeStyle = '#ababab';
    this._ctx.lineWidth = 1;
    this._ctx.stroke();
  }

  run(): void {
    this.tick();

    this._rafId = window.requestAnimationFrame(() => this.run());
  }

  pause(): void {
    window.cancelAnimationFrame(this._rafId);
    this.objects.forEach((object) => object.pause());
  }
}
