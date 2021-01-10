import React from 'react';
import './propertyCard.styles.css';
import { useHistory } from 'react-router-dom';

const PropertyCard = ({ address, photo, id }) => {
  const history = useHistory();
  console.log('PHOTO ', photo);
  const handleClick = () => {
    history.push(`/login?from=${id}`);
  };

  return (
    <div className="property-card">
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
                  Click the button to see auction status and place your bid
                </p>
                <button className="btn" onClick={handleClick}>
                  Details
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PropertyCard;
