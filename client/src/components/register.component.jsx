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
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '30vw',
          margin: '0 auto',
          marginTop: '8vw',
          justifyContent: 'space-around',
          height: '35vw',
          border: '1px solid grey',
          borderRadius: '1rem',
          padding: '3rem',
        }}
      >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="firstname lastname"
            value={state.name}
            onChange={handleChange}
            style={{
              width: '100%',
              letterSpacing: '.2rem',
              height: '2rem',
              border: 'none',
              borderBottom: '1px solid grey',
            }}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
            style={{
              width: '100%',
              letterSpacing: '.2rem',
              height: '2rem',
              border: 'none',
              borderBottom: '1px solid grey',
            }}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
            style={{
              width: '100%',
              letterSpacing: '.3rem',
              height: '2rem',
              border: 'none',
              borderBottom: '1px solid grey',
            }}
          />
        </div>
        <button>SIGN ME UP</button>
      </form>
    </div>
  );
};

export default Register;
