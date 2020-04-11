import { Clock } from './elements/clock';
import { FixedAccelerationSquare } from './elements/fixed-acceleration-square';
import { FixedSpeedSquare } from './elements/fixed-speed-square';
import { Scenario } from './elements/scenario';
import { ConstructorEvent } from './type';

export function createScenario(canvas: HTMLCanvasElement) {
  const w = canvas.width;
  const h = canvas.height;
  const scenario = new Scenario(canvas, {
    width: w,
    height: h,
  });

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

  constructors.forEach((con) => {
    switch (con.type) {
      case 'fixed-speed':
        scenario.addObject(new FixedSpeedSquare(con.payload));
        break;

      case 'fixed-acceleration':
        scenario.addObject(new FixedAccelerationSquare(con.payload));
        break;

      case 'clock':
        scenario.addObject(new Clock(con.payload));
        break;

      default:
        break;
    }
  });

  return scenario;
}
