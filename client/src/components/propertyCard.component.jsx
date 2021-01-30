import React from 'react';
import './propertyCard.styles.css';
import { useHistory } from 'react-router-dom';

const PropertyCard = ({ address, images, id }) => {
  const history = useHistory();
  console.log('PHOTO ', images);
  const handleClick = () => {
    const path = localStorage.getItem('accessToken')
      ? `/properties/${id}`
      : `/login?from=${id}`;
    history.push(path);
  };

  return (
    <div className="property-card">
      <div className="card">
        <div className="card-image">
          <img src={images[0]} alt="property images" />
        </div>
        <div className="card-content">
          <h2 className="address">{address.street}</h2>
          <h2 className="address">{address.city}</h2>
          <h2 className="address">{address.state}</h2>
          <button className="btn" onClick={handleClick}>
            See details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
