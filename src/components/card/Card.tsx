import { FC } from 'react';

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
  return (
    <div
      className="hand-card"
      onClick={() => {
        if (!computerThinking) {
          playerChosedCard(cardName);
        }
      }}
    >
      <img src={img} alt="" className="card-image" />
    </div>
  );
};

export default Card;
