import { FC } from 'react';
// @ts-ignore
import hover from '../../assets/sounds/jump.wav';
// @ts-ignore
import click from '../../assets/sounds/clickmenu.wav';
// @ts-ignore
import cantClick from '../../assets/sounds/cantClick.wav';

type Props = {
  handCard: {
    cardName: string,
    img:string,
  },
  computerThinking: boolean,
  playerChosedCard: (value: string) => void
}

const Card:FC<Props> = ({ handCard, playerChosedCard, computerThinking }) => {
  const { cardName, img } = handCard;
  const hoverSound = new Audio(hover);
  const clickSound = new Audio(click);
  const cantClickSound = new Audio(cantClick);
  hoverSound.volume = 0.2;
  clickSound.volume = 0.5;
  cantClickSound.volume = 0.3;
  return (
    <div
      className="hand-card"
      onClick={() => {
        if (!computerThinking) {
          playerChosedCard(cardName);
          clickSound.play();
        }
        if (computerThinking) {
          cantClickSound.play();
        }
      }}
      onMouseEnter={() => hoverSound.play()}
    >
      <img src={img} alt="" className="card-image" />
    </div>
  );
};

export default Card;
