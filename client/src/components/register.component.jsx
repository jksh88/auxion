import React, { useState } from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  name: '',
  email: '',
  password: '',
};

const Register = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((curState) => ({ ...curState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;
    const user = { name, email, password }; //ES6 syntax
    console.log('USER FROM INPUT FORM IS..', user);
    // const res = await apiSvc.register(user);

    // const res = await axios.post(`${REACT_APP_SERVER_URL}/register`, user);
    const res = await fetch(`${REACT_APP_SERVER_URL}/register`, {
      method: 'POST',
      // credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    console.log('RES is.... ', res);
    console.log(res.error);

    if (!res.ok) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { token } = res;
      localStorage.setItem('accessToken', token);
      // setIsAuthenticated(true);
      // auth.login(() => history.push('/profile'));
    }
  };

  return (
    <div className="register">
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="firstname lastname"
          value={state.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button>SIGN ME UP</button>
      </form>
    </div>
  );
};

export default Register;
