import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './register.styles.css';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  name: '',
  email: '',
  password: '',
};

const Register = (props) => {
  const [state, setState] = useState(initialState);
  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((curState) => ({ ...curState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;
    const user = { name, email, password }; //ES6 syntax
    console.log('USER FROM INPUT FORM IS..', user);

    // const res = await axios.post(`${REACT_APP_SERVER_URL}/register`, user);
    const res = await fetch(`${REACT_APP_SERVER_URL}/register`, {
      method: 'POST',
      // credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    setState(initialState);
    if (!res.ok) {
      const message = await res.text();
      alert(message);
    } else {
      const parsedUser = await res.json();
      const { token, _id } = parsedUser;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', _id);
      props.handleAuth(true); //set isAuthenticated to true using handleAuth function passed down from App component
      history.push('/');
    }
  };

  return (
    <div className="register">
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="firstname lastname"
            value={state.name}
            onChange={handleChange}
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
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <button>SIGN ME UP</button>
      </form>
    </div>
  );
};

export default Register;
