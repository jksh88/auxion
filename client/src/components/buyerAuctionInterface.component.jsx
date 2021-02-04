import React from 'react';
// import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
//I cannot use props from Broswer Router because this is not a page component that can be listed inside of Broswer Router. This component only loads within another page. This is not a page.

const BuyerAuctionInterface = (props) => {
  // const history = useHistory();
  return (
    <div>
      <h3>Click the image to see more pictures</h3>
      <button
        // onClick={() => history.push(`${history.location.pathname}/makeabid`)}
        onClick={() =>
          props.history.push({
            pathname: `${props.history.location.pathname}/makeabid`,
            state: props.bids,
          })
        }
      >
        Make a bid
      </button>
    </div>
  );
};

export default withRouter(BuyerAuctionInterface);
//Q: How to pass address props from parent to the makebid child? Not from route but from parent in this case? Make a bid for {address}
