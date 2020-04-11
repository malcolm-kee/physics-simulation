import { Clock } from '../elements/clock';
import { FixedAccelerationSquare } from '../elements/fixed-acceleration-square';
import { FixedSpeedSquare } from '../elements/fixed-speed-square';
import { DrawingObject, WorkerEvent } from '../type';

let objects: DrawingObject[] = [];
let context: OffscreenCanvasRenderingContext2D;
let width: number;
let height: number;
let gridLine: number;
let rafId: number;

function tick() {
  if (context) {
    context.clearRect(0, 0, width, height);
    objects.forEach((object) => {
      object.render(context);
      object.nextFrame();
    });

    const gridWidth = width / gridLine;
    const gridHeight = height / gridLine;
    context.beginPath();
    for (let i = 0; i <= width; i += gridWidth) {
      context.moveTo(i, 0);
      context.lineTo(i, height);
    }
    for (let j = 0; j <= height; j += gridHeight) {
      context.moveTo(0, j);
      context.lineTo(width, j);
    }
    context.strokeStyle = '#ababab';
    context.lineWidth = 1;
    context.stroke();
  }
}

function run() {
  tick();
  rafId = requestAnimationFrame(run);
}

function pause() {
  cancelAnimationFrame(rafId);
  objects.forEach((object) => object.pause());
}

self.onmessage = function (ev) {
  const message: WorkerEvent = ev.data;
  switch (message.type) {
    case 'clock':
      objects.push(new Clock(message.payload));
      break;

    case 'fixed-speed':
      objects.push(new FixedSpeedSquare(message.payload));
      break;

    case 'fixed-acceleration':
      objects.push(new FixedAccelerationSquare(message.payload));
      break;

    case 'init':
      objects = [];
      context = message.canvas.getContext('2d');
      width = message.width;
      height = message.height;
      gridLine = message.gridLine;
      break;

    case 'run':
      run();
      break;

    case 'pause':
      pause();
      break;

    default:
      console.log(`Unknown message`);
      console.log(message);
  }
};
