import { assign, Machine } from 'xstate';

type TimerContext = {
  intervalCount: number;
  intervalInMs: number;
  passedTime: number;
  lastTick: Date | null;
};

type TimerStateSchema = {
  states: {
    running: {};
    paused: {};
  };
};

export const timerMachine = Machine<
  TimerContext,
  TimerStateSchema,
  { type: 'TOGGLE' }
>(
  {
    id: 'timer',
    initial: 'paused',
    context: {
      intervalInMs: 1000,
      intervalCount: 0,
      passedTime: 0,
      lastTick: null,
    },
    states: {
      running: {
        type: 'atomic',
        on: {
          TOGGLE: 'paused',
        },
        invoke: {
          src: 'tick',
        },
      },
      paused: {
        type: 'atomic',
        on: {
          TOGGLE: 'running',
        },
      },
    },
  },
  {
    actions: {
      oneIntervalPassed: assign<TimerContext>({
        intervalCount: (context) => context.intervalCount + 1,
        lastTick: () => new Date(),
      }),
    },
    services: {
      tick: () => (callback) => {},
    },
  }
);
