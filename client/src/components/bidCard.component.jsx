import React from 'react';

const BidCard = ({ auction }) => {
  return auction.bids[0].purchasePrice;
};

export default BidCard;
