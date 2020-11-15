import React from 'react';
import './propertyDetails.styles.css';

const PropertyDetails = ({ address }) => {
  return (
    <div className="property-details">
      <h2>{address}</h2>
    </div>
  );
};

export default PropertyDetails;
