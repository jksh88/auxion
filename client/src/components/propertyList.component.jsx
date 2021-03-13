import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from './propertyCard.component';
import './propertyList.styles.css';
import Loading from './loading.component';

const { REACT_APP_SERVER_URL } = process.env;

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    return axios
      .get(`${REACT_APP_SERVER_URL}/properties`)
      .then((res) => {
        console.log('RESPONSE DATA: ', res.data);

        setProperties(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (!isLoading) {
    return <Loading />;
  }
  return (
    <div className="property-list">
      {properties.map(({ _id, ...otherProps }) => (
        <PropertyCard key={_id} {...otherProps} id={_id} />
      ))}
    </div>
  );
};

export default PropertyList;
