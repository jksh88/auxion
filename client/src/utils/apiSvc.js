const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const apiSvc = {};

apiSvc.register = (user) => {
  console.log('USER...', user);
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    mode: 'cors',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.text())
    .catch((err) => console.log(err));
};

// apiSvc.login = (user) => {
//   return axios
//     .post('http://localhost:3000/login', user)
//     .then((res) => console.log('HI'))
//     .catch((err) => console.log(err));
// };

apiSvc.login = (user) => {
  console.log(user);
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.text())
    .catch((err) => console.log(err));
};

apiSvc.profile = (tokenReceived) => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${tokenReceived}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiSvc.logout = (tokenName) => {
  window.localStorage.removeItem(tokenName);
};

export default apiSvc;
