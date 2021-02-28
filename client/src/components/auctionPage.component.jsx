import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PropertyPictures from './propertyPictures.component';
import OwnerAuctionInterface from './ownerAuctionInterface.component';
import BuyerAuctionInterface from './buyerAuctionInterface.component';
import { io } from 'socket.io-client';
import { timeConverter } from './timerFunction';
import { convertAmount } from './convertAmount';

import './auctionPage.styles.css';
const { REACT_APP_SERVER_URL } = process.env;

const AuctionPage = (props) => {
  const { id } = props.match.params;
  const [property, setProperty] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const socketCallback = useCallback((payload) => {
    const auction = JSON.parse(payload);
    if (auction.propertyOnSale === id) {
      setProperty((curState) => {
        console.log('CURSTATE: ', curState);
        return {
          ...curState,
          auction: {
            ...curState.auction,
            currentHighestBid: auction.currentHighestBid,
            bids: auction.bids,
          },
          description: curState.description,
        };
      });
    }
    console.log(payload);
    console.log('Socket connection established');
  });
  console.log('PROPERTY: ', property);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
      transports: ['websocket'],
    });
    socket.on('bid', socketCallback);
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
        let endDate = new Date(res.data.auction.auctionEndTime).getTime();
        console.log('ENDDATE: ', endDate);
        let now = new Date().getTime();
        console.log('NOW: ', now);

        let timeTillEnd = timeConverter(endDate - now);
        setTimeRemaining(timeTillEnd);
      })
      .catch((err) => console.log(err));
    return () => socket.disconnect();
  }, []);
  //If I use some variable from outer scope(like 'id' here) in useEffect, that varialbe needs to go inside the array after the useEffect, because it's a presumption of React that I might have have forgottent it. It's because my state can be dependent on the value of that variable. This callback in useEffect will run everytime and only when the id changes.

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="auction-page">
      {property && (
        <>
          <div>
            <h1>{`${property.address?.street}, ${property.address?.city}, ${property.address?.state}`}</h1>
            <div className="description">{`"${property.description}"`}</div>
          </div>
          <section className="picture-and-auction-info">
            <div className="one-picture" onClick={openModal}>
              <img src={property.images[0]} />
            </div>
            <div className="auction-info">
              <div>
                <h2>
                  Current Highest Bid:{' '}
                  {convertAmount(property.auction.currentHighestBid)}
                </h2>
                Auction Ends in {timeRemaining}
              </div>

              <div className="by-user-type-interface">
                {isOwner ? (
                  <OwnerAuctionInterface
                    // id={property.auction.propertyOnSale}
                    // bids={property.auction.bids}
                    property={property}
                  />
                ) : (
                  <BuyerAuctionInterface
                    address={property.address}
                    bids={property.auction.bids}
                  />
                )}
              </div>
            </div>
          </section>

          <Modal
            style={{
              overlay: {
                position: 'fixed',
                height: '660px',
                width: '680px',
                top: 80,
                left: 80,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
              },
              content: {
                position: 'absolute',
                top: '40px',
                left: '40px',
                right: '40px',
                bottom: '40px',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px',
              },
            }}
            isOpen={isOpen}
            contentLabel="Example Modal"
          >
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
            <PropertyPictures pics={property.images} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default AuctionPage;
