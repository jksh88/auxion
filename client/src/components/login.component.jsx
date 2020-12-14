import React, { useState } from 'react';
import auth from '../utils/auth';
import apiSvc from '../utils/apiSvc';
import axiosSvc from '../utils/axiosSvc';

import CustomButton from './custom-button.component.jsx';
import axios from 'axios';

const initialState = { email: '', password: '' };

const Login = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((curState) => ({ ...curState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;
    const user = { email, password };
    console.log('email at front-end is.... ', email);
    const res = await axiosSvc.login(user);

    // const res = await axios.post('http://localhost:3000/login', user);
    console.log('RES is.... ', res);
    // console.log(res.error);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { token } = res; //wrapped in braces on 11/1/2000
      console.log('TOKEN IS... :', token);
      window.localStorage.setItem('accessToken', token);

      props.setIsAuthenticated(true);
      auth.login(() => props.history.push('/profile'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Your email"
        value={state.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Your password"
        value={state.password}
        onChange={handleChange}
      />
      <CustomButton>SIGN ME IN</CustomButton>
    </form>
  );
};

export default Login;
