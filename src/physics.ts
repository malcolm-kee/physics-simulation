export function createScenario(canvas: HTMLCanvasElement) {
  if (typeof canvas.transferControlToOffscreen === 'function') {
    return import('./delegate-scenario-to-worker').then((code) =>
      code.createScenario(canvas)
    );
  }
  return import('./create-scenario').then((code) =>
    code.createScenario(canvas)
  );
}
