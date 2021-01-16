import React from 'react';
import './propertyPictures.styles.css';

import ImageGallery from 'react-image-gallery';

// const images = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1018/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1019/250/150/',
//   },
// ];

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
