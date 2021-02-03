import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from './propertyCard.component';
import './propertyList.styles.css';

const { REACT_APP_SERVER_URL } = process.env;

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    return axios
      .get(`${REACT_APP_SERVER_URL}/properties`)
      .then((res) => {
        console.log('RESPONSE DATA: ', res.data);

        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="property-list">
      {properties.map(({ _id, ...otherProps }) => (
        <PropertyCard key={_id} {...otherProps} id={_id} />
      ))}
    </div>
  );
};

export default PropertyList;
