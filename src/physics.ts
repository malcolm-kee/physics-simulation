import { Clock } from './elements/clock';
import { FixedAccelerationSquare } from './elements/fixed-acceleration-square';
import { FixedSpeedSquare } from './elements/fixed-speed-square';
import { Scenario } from './elements/scenario';

export function createScenario(canvas: HTMLCanvasElement): Scenario {
  const w = canvas.width;
  const h = canvas.height;
  const scenario = new Scenario(canvas.getContext('2d'), {
    width: w,
    height: h,
  });

  [
    new FixedSpeedSquare(
      {
        width: 5,
        height: 5,
      },
      [0, h / 2],
      [50, 0],
      'gold'
    ),
    new FixedAccelerationSquare({
      acceleration: [20, 0],
      initial: {
        position: [0, (h * 3) / 4],
        speed: [0, 0],
      },
      size: [5, 5],
      color: 'red',
    }),
    new Clock({ font: '36px sans serif', x: w / 2, y: h / 3, color: '#222' }),
  ].forEach((object) => {
    scenario.addObject(object);
  });

  return scenario;
}
