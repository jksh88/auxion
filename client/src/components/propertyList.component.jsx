import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyDetails from './propertyDetails.component';
import './propertyList.styles.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    return axios
      .get('http://localhost:3000/properties')
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="property-list">
      {properties.map(({ _id, ...otherProps }) => (
        <PropertyDetails key={_id} {...otherProps} />
      ))}
    </div>
  );
};

export default PropertyList;
