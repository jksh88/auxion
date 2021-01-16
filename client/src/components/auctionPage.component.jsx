import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PropertyPictures from './propertyPictures.component';
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

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    alert('modal is open now');
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
              <Modal
                isOpen={true}
                onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                // style={customStyles}
                contentLabel="Example Modal"
              >
                <PropertyPictures pics={property.images} />
                <button>Close Modal</button>
              </Modal>
            </div>
            <div className="auction-info">
              <div>{property.auction.currentHighestBid}</div>
              <div className="by-user-type-interface">
                <p>{isOwner ? 'Owner Interface' : 'Buyer Interface'}</p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AuctionPage;
