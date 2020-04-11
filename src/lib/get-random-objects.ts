import { ConstructorEvent, XandY } from '../type';

const rand = (max: number, signed = false) => {
  const result = Math.floor(Math.random() * max);
  const isPositive = !signed || Math.floor(Math.random() * 1000) % 2 === 0;

  return isPositive ? result : -result;
};

export const getRandomObject = (size: XandY): ConstructorEvent => {
  const randomNumber = rand(100);
  if (randomNumber % 2 === 0) {
    return {
      type: 'fixed-acceleration',
      payload: {
        size: [5, 5],
        acceleration: [rand(10, true), rand(10, true)],
        initial: {
          position: [rand(size[0]), rand(size[1])],
          speed: [rand(100, true), rand(100, true)],
        },
        color: 'yellow',
      },
    };
  } else {
    return {
      type: 'fixed-speed',
      payload: {
        size: [5, 5],
        velocity: [rand(100, true), rand(100, true)],
        position: [rand(size[0]), rand(size[1])],
        color: 'gold',
      },
    };
  }
};
