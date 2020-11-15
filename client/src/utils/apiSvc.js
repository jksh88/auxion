const BASE_URL = 'http://localhost:3000';

const apiSvc = {};

apiSvc.register = (user) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiSvc.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiSvc.profile = (tokenReceived) => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenReceived}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiSvc.logout = (tokenName) => {
  windows.localStorage.removeItem(tokenName);
};

export default apiSvc;
