import React from 'react';
import { useHistory } from 'react-router-dom';
import './ownerAuctionInterface.styles.css';

const OwnerAuctionInterface = (props) => {
  const history = useHistory();
  console.log(history);
  return (
    <div className="owner-auction-interface">
      <button
        onClick={() =>
          history.push({
            pathname: `${history.location.pathname}/bids`,
            state: props.bids,
          })
        }
      >
        See all bids
      </button>

      <button className="button-secondary">Change listing terms</button>
    </div>
  );
};

export default OwnerAuctionInterface;
