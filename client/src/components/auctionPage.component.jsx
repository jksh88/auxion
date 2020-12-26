import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;

const AuctionPage = () => {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_URL}/property/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <h1>{`This is auction page for address ${id}`}</h1>
    </div>
  );
};

export default AuctionPage;
