import './App.scss';
import Game from './components/game/Game';

// @ts-ignore
import gameMusic from './assets/sounds/BGmusic.wav';

const App = () => {
  const bgMusic = new Audio(gameMusic);
  bgMusic.volume = 0.1;

  return (
    <div className="App">
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
        <Game />
      </main>
    </div>
  );
};

export default App;
