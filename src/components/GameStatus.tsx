/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';

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
  const finalWinnerIs = () => {
    if (finalWinner) {
      if (finalWinner === 0) {
        return "It's a tie!";
      }
      if (finalWinner === 1) {
        return 'Player won!';
      }
      if (finalWinner === 2) {
        return 'Computer won!';
      }
    }
    return '';
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
  return (
    <div className="game-over-screen">
      <h3 className="who-wins--game">
        Game's is over!
      </h3>
      <h3 className="who-wins--winner">
        {finalWinnerIs()}
      </h3>
      <form>
        <button className="play-again">Play Again</button>
      </form>
    </div>
  );
};

export default GameStatus;