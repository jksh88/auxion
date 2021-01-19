//TODO & Quesion: How to manage authentication for the same client or Ip address being used by different users?

import React from 'react';

const Logout = ({ history }) => {
  return (
    <>
      {localStorage.removeItem('accessToken')}
      {localStorage.removeItem('userId')}
      {history.push('/')}
    </>
  );
};

export default Logout;
