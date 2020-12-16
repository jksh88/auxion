import React from 'react';
import Navbar from './navbar.component';
import PropertyList from './propertyList.component';

const Landing = () => {
  return (
    <div>
      <h1>
        Place your bids for timed for-sale-by-owner auctions to be the winning
        bidder to be accepted
      </h1>
      <PropertyList />
    </div>
  );
};

export default Landing;
