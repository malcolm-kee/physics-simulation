import { Clock } from '../elements/clock';
import { FixedAccelerationSquare } from '../elements/fixed-acceleration-square';
import { FixedSpeedSquare } from '../elements/fixed-speed-square';
import { Scenario } from '../elements/scenario';
import { WorkerEvent } from '../elements/type';

let scenario: Scenario;

self.onmessage = function (ev) {
  const message: WorkerEvent = ev.data;
  switch (message.type) {
    case 'init':
      scenario = new Scenario(
        message.canvas.getContext('2d'),
        {
          width: message.width,
          height: message.height,
        },
        message.gridLine
      );
      break;

    case 'clock':
      scenario.addObject(new Clock(message.payload));
      break;

    case 'fixed-speed':
      scenario.addObject(new FixedSpeedSquare(message.payload));
      break;

    case 'fixed-acceleration':
      scenario.addObject(new FixedAccelerationSquare(message.payload));
      break;

    case 'run':
      scenario.run();
      break;

    case 'pause':
      scenario.pause();
      break;

    default:
      console.log(`Unknown message`);
      console.log(message);
  }
};
