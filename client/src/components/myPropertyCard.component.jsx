import React from 'react';
import './myPropertyCard.styles.css';

const MyPropertyCard = ({ address }) => {
  return (
    <div className="my-property-card">
      <h1>{`${address.street}, ${address.city}, ${address.state}`}</h1>
    </div>
  );
};

export default MyPropertyCard;
