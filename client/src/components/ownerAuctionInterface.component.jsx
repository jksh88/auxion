import React from 'react';
import { useHistory } from 'react-router-dom';

const OwnerAuctionInterface = (props) => {
  const history = useHistory();
  console.log(history);
  return (
    <div>
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
    </div>
  );
};

export default OwnerAuctionInterface;
