import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PropertyPictures from './propertyPictures.component';
import OwnerAuctionInterface from './ownerAuctionInterface.component';
import BuyerAuctionInterface from './buyerAuctionInterface.component';

import './auctionPage.styles.css';
const { REACT_APP_SERVER_URL } = process.env;

const AuctionPage = (props) => {
  const { id } = props.match.params;
  const [property, setProperty] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="auction-page">
      {property && (
        <>
          <section>
            <div>{`Auction page for address ${property.address.street}`}</div>
            <div>{`Auction page for address ${property.auction.currentHighestBid}`}</div>
          </section>
          <section>
            <div className="one-picture" onClick={openModal}>
              <img src={property.images[0]} />
            </div>
            <div className="auction-info">
              <div>{property.auction.currentHighestBid}</div>
              <div className="by-user-type-interface">
                {isOwner ? (
                  <OwnerAuctionInterface bids={property.auction.bids} />
                ) : (
                  <BuyerAuctionInterface bids={property.auction.bids} />
                )}
              </div>
            </div>
          </section>

          <Modal isOpen={isOpen} contentLabel="Example Modal">
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
            <PropertyPictures pics={property.images} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default AuctionPage;
