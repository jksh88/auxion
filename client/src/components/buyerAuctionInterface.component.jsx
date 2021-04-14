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
        //So here I am expecting the user to go to 'makeabid' route through BuyerAuctionInterface. Most of the times that will be the user behavior.
        //However, in some cases, the user wants to click on the link emailed from his friend to go to that page. (eg. 'http://localhost:3000/properties/6042dee5a5252600154b37a9/makeabid')
        //Then in this case, the props will be undefined as makeabid doesn't have props passed in from parent component.
        //This is one example where central state management like Redux would have been better.

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
//I am getting the bids prop from the parent and pass it as a state of the '/makeabid' route to make the bid.

export default withRouter(BuyerAuctionInterface);
//Q: How to pass address props from parent to the makebid child? Not from route but from parent in this case? Make a bid for {address}
//A: Not possible through using local states and routers. Use Redux instead.
