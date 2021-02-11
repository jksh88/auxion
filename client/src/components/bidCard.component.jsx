import React from 'react';
import { useHistory } from 'react-router-dom';
import './bidCard.styles.css';
import { convertAmount } from './convertAmount';

const BidCard = ({ auction }) => {
  const history = useHistory();

  const { purchasePrice } = auction.bids[0];
  const { currentHighestBid } = auction;
  const { address, images, _id: id } = auction.propertyOnSale;
  const handleClick = () => {
    history.push({
      pathname: `/properties/${id}/makeabid`,
      state: auction.bids,
    });
  };
  return (
    <div onClick={handleClick} className="bid-card">
      <div className="property-image">
        <img src={images[0]} alt="property picture" />
      </div>
      <div>{`${address.street}, ${address.city} ${address.state}`}</div>
      <div className="current-highest-bid">
        CURRENT HIGHEST BID: {convertAmount(currentHighestBid)}{' '}
      </div>
      <div className={purchasePrice === currentHighestBid ? 'green' : 'red'}>
        YOUR BID: {convertAmount(purchasePrice)}
      </div>
    </div>
  );
};

export default BidCard;
