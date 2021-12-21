import './App.scss';
import { useState } from 'react';
import Game from './components/game/Game';

// @ts-ignore
import gameMusic from './assets/sounds/BGmusic.wav';

const App = () => {
  const bgMusic = new Audio(gameMusic);
  bgMusic.volume = 0.1;
  const [gameAmount, setgameAmount] = useState<null | number>(null);
  return (
    <div className="App">
      <div className={`modal-wrapper ${gameAmount && 'hide-modal'}`}>
        <div className="modal-game-start">
          <h1 className="game-dificulity--h1">Rock Paper Scisor And The Rest</h1>
          <h3 className="game-dificulity--h3">Choose round amount & play!</h3>
          <div className="game-dificulity">
            <button className="button-dificulity" onClick={() => setgameAmount(3)}>3x</button>
            <button className="button-dificulity" onClick={() => setgameAmount(5)}>5x</button>
            <button className="button-dificulity" onClick={() => setgameAmount(7)}>7x</button>
          </div>
        </div>
        <div className="modal-game-start-bg" />
      </div>
      <header className="App-header">
        <h1>Rock Paper Scisor And The Rest</h1>
        <div
          className="mute-button"
          onClick={() => {
            if (!bgMusic.paused) {
              bgMusic.pause();
            } else {
              bgMusic.play();
            }
          }}
        >
          Toggle music
        </div>

      </header>
      <main className="game-wrapper">
        <Game gameAmount={gameAmount} />
      </main>
    </div>
  );
};

export default App;
