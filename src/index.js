import React from 'react';
import ReactDOM from 'react-dom';
import { createScenario } from './physics';
import './styles.css';

const Playground = ({ isRunning }) => {
  const canvasRef = React.useRef(null);
  const [scenario, setScenario] = React.useState(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      setScenario(createScenario(canvasRef.current));
    }
  }, []);

  React.useEffect(() => {
    if (scenario) {
      if (isRunning) {
        scenario.run();
      } else {
        scenario.pause();
      }
    }
  }, [scenario, isRunning]);

  return <canvas width="500" height="500" ref={canvasRef} />;
};

const App = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);

  return (
    <div>
      <div>
        <Playground isRunning={isRunning} key={resetKey} />
        <button onClick={() => setIsRunning((x) => !x)}>Toggle</button>
        <button
          onClick={() => {
            setResetKey((x) => x + 1);
            setIsRunning(true);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
