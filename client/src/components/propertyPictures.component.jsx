import React from 'react';
import './propertyPictures.styles.css';

import ImageGallery from 'react-image-gallery';

const PropertyPictures = ({ pics }) => {
  console.log('PICS: ', pics);
  return (
    <div className="property-pictures">
      <ImageGallery
        items={pics.map((pic) => ({ original: pic, thumbnail: pic }))}
      />
    </div>
  );
};

export default PropertyPictures;
