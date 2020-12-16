import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const { NEXT_PUBLIC_SERVER_URL } = process.env;

const initialState = {
  email: '',
  password: '',
};

const Login = (props) => {
  const [state, setState] = useState(initialState);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  // const router = useRouter();

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
    const res = await fetch(`http://localhost:8000/login`, {
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
      const { token } = user;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('User', JSON.stringify(user));
      //push the whole user into localStorage
      const { history } = props;
      history && history.push('https://amazon.com');
    } else {
      alert('Login failed');
      // throw new Error();
    }
    setState({ email: '', password: '' });
  };

  return (
    <form
      className="sign-in"
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
      <div className="field" style={{ width: '100%' }}>
        <label>email</label>
        <input
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          required
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
        <label>password</label>
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            letterSpacing: '.3rem',
            height: '2rem',
            border: 'none',
            borderBottom: '1px solid grey',
          }}
        />
      </div>
      {/* <button disabled={!buttonEnabled}>Sign in</button> */}
      <button>Log in</button>
    </form>
  );
};

export default Login;
