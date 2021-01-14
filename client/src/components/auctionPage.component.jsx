import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;

const AuctionPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const isOwner =
    property && localStorage.getItem('userId') === property.owner._id;
  useEffect(async () => {
    axios
      .get(`${REACT_APP_SERVER_URL}/properties/${id}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        setProperty(res.data);
        console.log('DATA: ', res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {property && (
        <>
          {' '}
          <h1>{`Auction page for address ${property.address.street}`}</h1>
          <p>{isOwner ? 'Owner Interface' : 'Buyer Interface'}</p>
        </>
      )}
    </div>
  );
};

export default AuctionPage;
