import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import apiSvc from '../utils/apiSvc';
import axiosSvc from '../utils/axiosSvc';
import { Link } from 'react-router-dom';

const initialState = { name: '' };

const Profile = (props) => {
  const [state, setState] = useState(initialState);

  const name = state.name || 'Name missing..';

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('ACCESS TKN', accessToken);
    const getProfile = async (accessToken) => {
      //   const userInfo = await apiSvc.profile(accessToken);
      const userInfo = await axiosSvc.profile(accessToken);
      console.log(
        'USERINFO at Proifle Component after making axiosSvc.profile request call:',
        userInfo
      );

      if (userInfo) {
        const { name } = userInfo;
        setState((curState) => ({ ...curState, name }));
      } else {
        console.log('No user info found');
      }
    };
    getProfile(accessToken);
  }, []);
  //Need to display my property and auction status information below.
  return (
    <div>
      <h2>Welcome back, {name}</h2>
      <h2>My Property </h2>
    </div>
  );
};

export default Profile;
