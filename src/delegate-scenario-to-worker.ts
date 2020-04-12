import { ConstructorEvent } from './elements/type';

const worker = new Worker('./worker/worker.ts');

export function createScenario(canvas: HTMLCanvasElement) {
  const w = canvas.width;
  const h = canvas.height;

  const offScreen = canvas.transferControlToOffscreen();

  worker.postMessage(
    {
      type: 'init',
      canvas: offScreen,
      width: canvas.width,
      height: canvas.height,
      gridLine: 10,
    },
    [offScreen]
  );

  const constructors: ConstructorEvent[] = [
    {
      type: 'fixed-speed',
      payload: {
        size: [5, 5],
        position: [0, h / 2],
        velocity: [50, 0],
        color: 'gold',
      },
    },
    {
      type: 'fixed-acceleration',
      payload: {
        acceleration: [20, 0],
        initial: {
          position: [0, (h * 3) / 4],
          speed: [0, 0],
        },
        size: [5, 5],
        color: 'red',
      },
    },
    {
      type: 'clock',
      payload: {
        font: '36px sans serif',
        x: w / 2,
        y: h / 3,
        color: '#222',
      },
    },
  ];

  constructors.forEach((msg) => worker.postMessage(msg));

  return {
    run: () => worker.postMessage({ type: 'run' }),
    pause: () => worker.postMessage({ type: 'pause' }),
  };
}
