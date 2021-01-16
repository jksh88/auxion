import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyGallery from './buyerAuctionInterface.component';
import './auctionPage.styles.css';
const { REACT_APP_SERVER_URL } = process.env;

const AuctionPage = (props) => {
  const { id } = props.match.params;
  const [property, setProperty] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(async () => {
    axios
      .get(`${REACT_APP_SERVER_URL}/properties/${id}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        setProperty(res.data);
        setIsOwner(localStorage.getItem('userId') === res.data.owner);
        console.log('DATA: ', res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="auction-page">
      {property && (
        <>
          <div className="property-info">
            <h1>{`Auction page for address ${property.address.street}`}</h1>
            <p>{isOwner ? 'Owner Interface' : 'Buyer Interface'}</p>
            {isOwner ? 'Owner Interface' : <MyGallery />}
          </div>
          <div className="auction-info">
            <h1>{property.auction.currentHighestBid}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default AuctionPage;
