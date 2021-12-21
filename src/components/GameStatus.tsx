/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
// @ts-ignore
import hover from '../assets/sounds/jump.wav';
// @ts-ignore
import wonRound from '../assets/sounds/wonRound.wav';
import reloadIcon from '../assets/reload.png';

type Props ={
  counterOfCurrentChoicePresses: number,
  whoWonRound: string,
  canKeepPlaying: boolean,
  finalWinner: null | number,
}
const GameStatus:FC<Props> = ({
  counterOfCurrentChoicePresses,
  whoWonRound,
  canKeepPlaying,
  finalWinner,
}) => {
  const hoverSound = new Audio(hover);
  const wonRoundSound = new Audio(wonRound);
  hoverSound.volume = 0.1;
  wonRoundSound.volume = 0.2;
  const finalWinnerIs = () => {
    if (finalWinner === 2) {
      return "It's a tie!";
    }
    if (finalWinner === 1) {
      return 'Player won!';
    }
    if (finalWinner === 0) {
      return 'Computer won!';
    }
    return 'Computer won?';
  };
  if (canKeepPlaying) {
    return (
      <div className="game-over-screen">
        <h3 className="who-wins round-x">{`Round ${counterOfCurrentChoicePresses + 1}`}</h3>
        {whoWonRound && (
        <h3 className="who-wins-result">
          {whoWonRound}
        </h3>
        )}
      </div>
    );
  }
  wonRoundSound.play();

  return (
    <div className="game-over-screen">
      <h3 className="who-wins--game">
        Game is over!
      </h3>
      <h3 className="who-wins--winner">
        {finalWinnerIs()}
      </h3>
      <form>
        <button
          className="play-again"
          onMouseEnter={() => hoverSound.play()}
        >
          <span><img className="icon" src={reloadIcon} alt="" /></span>
          Play Again
        </button>
      </form>
    </div>
  );
};

export default GameStatus;
