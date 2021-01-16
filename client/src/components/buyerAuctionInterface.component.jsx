import React from 'react';
import { useHistory } from 'react-router-dom';

const BuyerAuctionInterface = (props) => {
  const history = useHistory();
  console.log(history);
  return (
    <div>
      <button
        onClick={() => history.push(`${history.location.pathname}/makeabid`)}
      >
        Make a bid
      </button>
      <h1>HHI from BuyerAuctionInterface</h1>);
    </div>
  );
};

export default BuyerAuctionInterface;
