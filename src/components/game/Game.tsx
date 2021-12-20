import { useState, useEffect } from 'react';

import Card from '../card/Card';
import ChosenCard from '../card/ChosenCard';
import { cardList } from '../cardsToDisplay';
import GameStatus from '../GameStatus';
import './Game.scss';
// span of ? sign
const noEntryYet = (<span className="no-entry-yet">?</span>);
const computersAvailableChoices = cardList.map(({ cardName }) => cardName);

const Game = () => {
  const [playersChoice, setplayersChoice] = useState('');
  const [playersPoints, setplayersPoints] = useState(0);

  const [computersChoice, setComputersChoice] = useState('');
  const [computersPoints, setComputersPoints] = useState(0);
  const [computerThinking, setComputerThinking] = useState(false);

  const [whoWonRound, setWhoWonRound] = useState('');
  const [finalWinner, setFinalWinner] = useState<null | number>(null);

  const [canKeepPlaying, setcanKeepPlaying] = useState(true);
  const [gameTurnAmount, setgameTurnAmount] = useState(7);
  const [counterOfCurrentChoicePresses, setcounterOfCurrentChoicePresses] = useState(0);
  const [tieCount, setTieCount] = useState(0);

  const [controlWinLoosePoints, setcontrolWinLoosePoints] = useState(-1);

  // useEffect(() => {
  //   if (controlWinLoosePoints === 1) {
  //     setWhoWonRound('Player gets a point');
  //     setplayersPoints(playersPoints + 1);
  //   } else if (controlWinLoosePoints === 0) {
  //     setWhoWonRound('Computer gets a point');
  //     setComputersPoints(computersPoints + 1);
  //   } else if (controlWinLoosePoints === 2) {
  //     setWhoWonRound('Looks like it is tie!');
  //     setTieCount(tieCount + 1);
  //   }
  //   console.log('useEffect', computersChoice, playersChoice);
  //   console.log(controlWinLoosePoints);
  // }, [computersChoice]);

  // const [gameEnded, setGameEnded] = useState(false);
  // const controlWinLoosePoints = (indicator: number) => {
  //   if (indicator === 1) {
  //     setWhoWonRound('Player gets a point');
  //     setplayersPoints(playersPoints + 1);
  //     console.log('playersPoints won +1');
  //   } else if (indicator === 0) {
  //     setWhoWonRound('Computer gets a point');
  //     setComputersPoints(computersPoints + 1);
  //     console.log('computersPoints won +1');
  //   }
  // };
  useEffect(() => {
    if (!computersChoice || !playersChoice) {
      setWhoWonRound('Choose your move!');
      return;
    }
    if ((computersChoice === playersChoice)) {
      setWhoWonRound("It's a tie!");
      setTieCount(tieCount + 1);
      return;
    }
    // scenariji
    switch (computersChoice) {
      case 'rock':
        if (playersChoice === 'paper' || playersChoice === 'spock') {
          setWhoWonRound('Player gets a point');
          setplayersPoints(playersPoints + 1);
        } else {
          setWhoWonRound('Computer gets a point');
          setComputersPoints(computersPoints + 1);
        }
        break;
      case 'paper':
        if (playersChoice === 'scissor' || playersChoice === 'lizzard') {
          setWhoWonRound('Player gets a point');
          setplayersPoints(playersPoints + 1);
        } else {
          setWhoWonRound('Computer gets a point');
          setComputersPoints(computersPoints + 1);
        }
        break;
      case 'scissor':
        if (playersChoice === 'rock' || playersChoice === 'spock') {
          setWhoWonRound('Player gets a point');
          setplayersPoints(playersPoints + 1);
        } else {
          setWhoWonRound('Computer gets a point');
          setComputersPoints(computersPoints + 1);
        }
        break;
      case 'spock':
        if (playersChoice === 'paper' || playersChoice === 'lizzard') {
          setWhoWonRound('Player gets a point');
          setplayersPoints(playersPoints + 1);
        } else {
          setWhoWonRound('Computer gets a point');
          setComputersPoints(computersPoints + 1);
        }
        break;
      case 'lizzard':
        if (playersChoice === 'scissor' || playersChoice === 'rock') {
          setWhoWonRound('Player gets a point');
          setplayersPoints(playersPoints + 1);
        } else {
          setWhoWonRound('Computer gets a point');
          setplayersPoints(playersPoints + 1);
        }
        break;
      default:
        break;
    }
  }, [counterOfCurrentChoicePresses]);

  const determineWinner = () => {
    if (playersPoints > computersPoints) {
      setFinalWinner(1);
    } if (playersPoints < computersPoints) {
      setFinalWinner(0);
    } if (playersPoints === computersPoints) {
      setFinalWinner(2);
    }
  };
  const playerChosedCard = (choice: string) => {
    if (canKeepPlaying) {
      if (!computerThinking) {
        if (counterOfCurrentChoicePresses === gameTurnAmount - 1) {
          setplayersChoice(choice);
          setcanKeepPlaying(false);
          determineWinner();
        }
      }
      if (counterOfCurrentChoicePresses < gameTurnAmount) {
        setplayersChoice(choice);
        setComputerThinking(true);
        setTimeout(() => {
          setComputerThinking(false);
          const randNum = Math.round(Math.random() * computersAvailableChoices.length - 1);
          const computerChosed = computersAvailableChoices[randNum < 0 ? 0 : randNum];
          setComputersChoice(computerChosed);
          setcounterOfCurrentChoicePresses(counterOfCurrentChoicePresses + 1);
        }, 200);
      }
    }
  };
  return (
    <div className="game">

      <div className="game-field">
        <div className="computer-block game__block">
          <h3 className="block__header">Computer</h3>
          <div className="block__card">
            {(!computersChoice && !computerThinking) && noEntryYet}
            {(computerThinking)
              ? 'Thinking...'
              : computersChoice && (<ChosenCard cardImg={computersChoice} />)}
          </div>
        </div>
        <div className="score-block game__block">
          <h2 className="block__header score-block__header">SCORE</h2>
          <span className="score-block__scores">
            <span className="score">
              {computersPoints}
            </span>
            <span className="score">
              {playersPoints}
            </span>
          </span>
          <GameStatus
            canKeepPlaying={canKeepPlaying}
            whoWonRound={whoWonRound}
            counterOfCurrentChoicePresses={counterOfCurrentChoicePresses}
            finalWinner={finalWinner}
          />
          <small className="turn-counter">
            <b>
              {`Match: ${counterOfCurrentChoicePresses} / ${gameTurnAmount}`}
            </b>
          </small>
          <small className="turn-counter">
            <b>
              {`Ties: ${tieCount}`}
            </b>
          </small>
        </div>

        <div className="player-block game__block">
          <h3 className="block__header">Player</h3>
          <div className="block__card">
            {playersChoice ? (<ChosenCard cardImg={playersChoice} />) : noEntryYet}
          </div>

        </div>
      </div>
      <div className="card-container">
        {cardList.map((handCard) => (
          <Card
            playerChosedCard={playerChosedCard}
            key={handCard.cardName}
            handCard={handCard}
            computerThinking={computerThinking}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
