export interface DrawingObject {
  nextFrame: () => void;
  pause: () => void;
  render: (ctx: CanvasRenderingContext2D) => void;
}

export type XandY = [number, number];
