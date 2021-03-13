import React, { useState } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import './login.styles.css';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  email: '',
  password: '',
};

const Login = (props) => {
  const [state, setState] = useState(initialState);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  // const router = useRouter();
  // const { from } = useParams();
  const { history } = props;
  // console.log('FROMMMM ', from);

  const id = new URLSearchParams(history.location.search).get('from');
  //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  //https://reactrouter.com/core/api/history
  const { email, password } = state;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(email);

    setButtonEnabled(email && password && Boolean(value));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setButtonEnabled(false);

    console.log(state);
    const res = await fetch(`${REACT_APP_SERVER_URL}/login`, {
      method: 'POST',
      // credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    console.log('RESPONSE ***** ', res);
    if (res.ok) {
      const user = await res.json();
      console.log('USER >>>>>', user);
      const { token, _id } = user;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', _id);
      //push the whole user into localStorage
      props.handleAuth(true); //set isAuthenticated to true using handleAuth function passed down from App component
      setState({ email: '', password: '' }); //clean out the fields
      history && history.push(id ? `properties/${id}` : '/profile');
      //TODO: if it did NOT come from an unauthenticated user clicking on a property detail button from landing page, but rather
      //it came from the navbar login, then we should send the user to profile page first
    } else {
      alert('Login failed');
      // throw new Error();
    }
  };

  return (
    <div>
      <form className="sign-in" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Email
            <input
              name="email"
              type="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="field">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* <button disabled={!buttonEnabled}>Sign in</button> */}
        <button>Log in</button>
      </form>
      <h4 style={{ textAlign: 'center' }}>
        No account yet?{' '}
        <Link to="/register" style={{ color: 'blue' }}>
          Register
        </Link>
      </h4>
    </div>
  );
};

export default withRouter(Login);
