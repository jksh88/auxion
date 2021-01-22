import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PropertyPictures from './propertyPictures.component';
import OwnerAuctionInterface from './ownerAuctionInterface.component';
import BuyerAuctionInterface from './buyerAuctionInterface.component';
import { io } from 'socket.io-client';

import './auctionPage.styles.css';
const { REACT_APP_SERVER_URL } = process.env;

const AuctionPage = (props) => {
  const { id } = props.match.params;
  const [property, setProperty] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
      transports: ['websocket'],
    });
    socket.on('bid', (payload) => {
      const auction = JSON.parse(payload);
      if (auction.propertyOnSale === id) {
        setProperty({
          ...property,
          auction,
        });
      }
      console.log(payload);
      console.log('Socket connection established');
    });
    //I don't need to import process.env above. React does it for me as long as I have it included in the .env file.

    //It's good to have the socket.io client function in useEffect callback because we need to make sure the compoent has loaded first because client relies on broswer.

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
  }, [id]);
  //If I use some variable from outer scope(like 'id' here) in useEffect, that varialbe needs to go inside the array after the useEffect, because it's a presumption of React that I might have have forgottent it. It's because my state can be dependent on the value of that variable. This callback in useEffect will run everytime and only when the id changes.

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
