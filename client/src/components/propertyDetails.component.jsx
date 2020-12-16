import React from 'react';
import './propertyDetails.styles.css';

const PropertyDetails = ({ address, photo }) => {
  console.log('PHOTO ', photo);
  return (
    <div className="property-details">
      <ul className="cards">
        <li className="cards_item" style={{ minWidth: '20rem' }}>
          <div className="card">
            <div className="card_image">
              <img
                src={`http://localhost:8000/images/${photo}`}
                alt="property photo"
              />
              <div className="card_content">
                <h2 className="address">{address}</h2>
                <p className="card_text">
                  Click the button to see details and place your bid
                </p>
                <button className="btn">Details</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PropertyDetails;
