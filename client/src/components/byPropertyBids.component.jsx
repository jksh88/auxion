import React from 'react';

const ByPropertyBids = (props) => {
  console.log(props);
  return <div>{JSON.stringify(props.history.location.state)}</div>;
};

export default ByPropertyBids;
