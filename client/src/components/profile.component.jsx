import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './propertyCard.component';
import BidCard from './bidCard.component';
const { REACT_APP_SERVER_URL } = process.env;

const initialState = null;

const Profile = (props) => {
  const [user, setUser] = useState(initialState);

  const name = (user && user.name) || 'Name missing..';

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('ACCESS TKN', accessToken);
    const getProfile = async (accessToken) => {
      const userInfo = await fetch(`${REACT_APP_SERVER_URL}/me`, {
        method: 'GET',
        // credentials: 'include',
        mode: 'cors',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));

      console.log(
        'USERINFO at Proifle Component after making get request call:',
        userInfo
      );

      if (userInfo) {
        setUser(userInfo);
        // const { name } = userInfo;
        // setState((curState) => ({ ...curState, name }));
      } else {
        console.log('No user info found');
      }
    };
    getProfile(accessToken);
  }, []);
  //Need to display my property and auction status information below.
  return (
    <div>
      <h2>Good day, {name}</h2>
      <h2>My Properties </h2>
      <div className="my-properties">
        {user &&
          user.properties.map(({ _id, ...otherProps }) => (
            <PropertyCard key={_id} {...otherProps} id={_id} />
          ))}
      </div>
      <h2 style={{ marginTop: 20 }}>My Bids </h2>

      <h4>
        {' '}
        <span style={{ color: 'green' }}>Green</span> if your bid price is the
        highest bid at the moment.
        <span style={{ color: 'red' }}> Red</span> if there is a higher bid
        price from another buyer
      </h4>

      <h4>Click on the card to adjust your bid terms</h4>
      {user &&
        user.auctions.map((auction) => (
          <BidCard key={auction._id} auction={auction} />
        ))}
    </div>
  );
};

export default Profile;
