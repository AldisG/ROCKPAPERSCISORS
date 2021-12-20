import { FC } from 'react';
import { cardList } from '../cardsToDisplay';

type Props = {
  cardImg:string,
}

const ChosenCard:FC<Props> = ({ cardImg }) => {
  const cardToDisplay = cardImg ? cardList.filter((item) => item.cardName === cardImg)[0].img : '';
  return (
    <div className="hand-card chosen">
      <img src={cardToDisplay} alt="" className="card-image" />
    </div>
  );
};
export default ChosenCard;
