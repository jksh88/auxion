const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const axiosSvc = {};

axiosSvc.login = (user) => {
  return axios
    .post(`${BASE_URL}/login`, user)
    .then((res) => res.text())
    .catch((err) => console.log(err));
};

axiosSvc.register = (user) => {
  return axios
    .post(`${BASE_URL}/register`, user)
    .then((res) => {
      console.log('RES.DATA at axiosSvc.register :', res.data);
      return res.data;
    })
    .catch((err) => console.log(err));
};

// axiosSvc.profile = (tokenReceived) => {
//   console.log('TOKEN AT AXIOSSVC: ', tokenReceived); //ok
//   //   console.log('USER AT PROFILE: ', user); //ok
//   return axios(`${BASE_URL}/me`, {
//     method: 'get',
//     // url: `${BASE_URL}/me`,
//     headers: {
//       Authorization: `Bearer ${tokenReceived}`,
//     },
//     // data: user,
//     withCredentials: true,
//   })
//     .then((res) => res)
//     .catch((err) => console.log(err));
// };

axiosSvc.profile = (tokenReceived) => {
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

axiosSvc.logout = (tokenName) => {
  window.localStorage.removeItem(tokenName);
};

export default axiosSvc;
