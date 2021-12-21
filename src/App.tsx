import './App.scss';
import { useState } from 'react';
import Game from './components/game/Game';
import mascot from './assets/hero.png';
import tutorial from './assets/tutorial.png';

// @ts-ignore
import gameMusic from './assets/sounds/BGmusic.wav';
// @ts-ignore
import hover from './assets/sounds/jump.wav';
// @ts-ignore
import click from './assets/sounds/hitHurt.wav';

const App = () => {
  const bgMusic = new Audio(gameMusic);
  const hoverSound = new Audio(hover);
  const clickSound = new Audio(click);
  hoverSound.volume = 0.4;
  clickSound.volume = 0.4;
  bgMusic.volume = 0.3;
  const [gameAmount, setgameAmount] = useState<null | number>(null);
  const [audiFix, setAudioFix] = useState(false);
  const playSoundSetDificulity = (dificulity: number) => {
    setgameAmount(dificulity);
    clickSound.play();
  };
  return (
    <div className="App">
      <div className={`modal-wrapper ${gameAmount && 'hide-modal'}`}>
        {!audiFix && (
        <div
          className="button-dificulity"
          onClick={() => {
            clickSound.play();
            setAudioFix(true);
            if (bgMusic.paused) {
              bgMusic.play();
            } else {
              bgMusic.pause();
            }
          }}
        >
          START
        </div>
        )}
        {audiFix && (
          <div className="modal-game-start">
            <h1 className="game-dificulity--h1">Rock Paper Scissors And The Rest</h1>
            <div className="game-rules">
              <div className="rules">
                <b>The game is simple.</b>
                <br />
                Each sign beats two and gets beaten by two.
                Here is the (penta)gram, of how it works!
                <div className="mascot tutorial">
                  <img src={tutorial} alt="" />
                </div>
              </div>
              <div className="mascot">
                <img src={mascot} alt="" />
              </div>
            </div>
            <h3 className="game-dificulity--h3">Choose round amount & play!</h3>
            <div className="game-dificulity">
              <button
                className="button-dificulity"
                onMouseEnter={() => hoverSound.play()}
                onClick={() => playSoundSetDificulity(3)}
              >
                3x

              </button>
              <button
                className="button-dificulity"
                onMouseEnter={() => hoverSound.play()}
                onClick={() => playSoundSetDificulity(5)}
              >
                5x

              </button>
              <button
                className="button-dificulity"
                onMouseEnter={() => hoverSound.play()}
                onClick={() => playSoundSetDificulity(7)}
              >
                7x

              </button>
            </div>
          </div>
        )}
        <div className="modal-game-start-bg" />
      </div>
      <header className="App-header">
        <h1>Rock Paper Scissors And The Rest</h1>
      </header>
      <main className="game-wrapper">
        <Game gameAmount={gameAmount} />
      </main>
    </div>
  );
};

export default App;
