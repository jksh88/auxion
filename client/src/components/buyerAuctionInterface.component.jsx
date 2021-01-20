import React from 'react';
import { useHistory } from 'react-router-dom';
//I cannot use props from Broswer Router because this is not a page component that can be listed inside of Broswer Router. This component only loads within another page. This is not a page.

const BuyerAuctionInterface = (props) => {
  const history = useHistory();
  return (
    <div>
      <button
        // onClick={() => history.push(`${history.location.pathname}/makeabid`)}
        onClick={() =>
          history.push({
            pathname: `${history.location.pathname}/makeabid`,
            state: props.bids,
          })
        }
      >
        Make a bid
      </button>
      <h1>HHI from BuyerAuctionInterface</h1>);
    </div>
  );
};

export default BuyerAuctionInterface;
