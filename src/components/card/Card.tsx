import { FC } from 'react';
// @ts-ignore
import hover from '../../assets/sounds/jump.wav';
// @ts-ignore
import click from '../../assets/sounds/hitHurt.wav';
// @ts-ignore
import cantClick from '../../assets/sounds/cantClick.wav';

type Props = {
  handCard: {
    cardName: string,
    img:string,
  },
  computerThinking: boolean,
  playerChosedCard: (value: string) => void,
  gameOver: boolean
}

const Card:FC<Props> = ({
  handCard, playerChosedCard, computerThinking, gameOver,
}) => {
  const { cardName, img } = handCard;
  const hoverSound = new Audio(hover);
  const clickSound = new Audio(click);
  const cantClickSound = new Audio(cantClick);
  hoverSound.volume = 0.1;
  clickSound.volume = 0.2;
  cantClickSound.volume = 0.3;
  return (
    <div
      className={`hand-card ${gameOver && 'no-card-effects'}`}
      onClick={() => {
        if (!gameOver) {
          if (!computerThinking) {
            playerChosedCard(cardName);
            clickSound.play();
          }
          if (computerThinking) {
            cantClickSound.play();
          }
        }
      }}
      onMouseEnter={() => {
        if (!gameOver) {
          hoverSound.play();
        }
      }}
    >
      <img src={img} alt="" className="card-image" />
    </div>
  );
};

export default Card;
