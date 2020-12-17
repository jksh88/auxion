import React from 'react';
import { useParams } from 'react-router-dom';

const AuctionPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>{`This is auction page for address ${id}`}</h1>
    </div>
  );
};

export default AuctionPage;
