import React from 'react';
import { useHistory } from 'react-router-dom';
import './ownerAuctionInterface.styles.css';

const OwnerAuctionInterface = (props) => {
  const history = useHistory();
  console.log(history);
  console.log('PROPS.PROPERTY AT OAI: ', props.property);
  return (
    <div className="owner-auction-interface">
      <button
        onClick={() =>
          history.push({
            pathname: `${history.location.pathname}/bids`,
            // state: props.bids,
            state: props.property?.auction.bids,
          })
        }
      >
        See all bids
      </button>

      <button
        className="button-secondary"
        onClick={() =>
          history.push({
            pathname: `${history.location.pathname}/edit`,
            // state: props.auction,
            //TODO: figure out how to populate existing listing terms on form
          })
        }
      >
        Change listing terms
      </button>
    </div>
  );
};

export default OwnerAuctionInterface;
