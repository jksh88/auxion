//TODO & Quesion: How to manage authentication for the same client or Ip address being used by different users?

import React from 'react';

const Logout = (props) => {
  return (
    <>
      {localStorage.removeItem('accessToken')}
      {localStorage.removeItem('userId')}
      {props.handleAuth(false)}
      {props.history.push('/')}
    </>
  );
};

export default Logout;
