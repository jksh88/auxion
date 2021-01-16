import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  purchasePrice: 0,
  deposit: 0,
  dueDiligence: 0,
  closingDate: new Date().toJSON().slice(0, 10),
};

const MakeABid = (props) => {
  const [state, setState] = useState(initialState);
  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((curState) => ({ ...curState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { id } = props.match.params;
    // const res = await axios.post(`${REACT_APP_SERVER_URL}/register`, user);
    const res = await fetch(`${REACT_APP_SERVER_URL}/properties/${id}/bid`, {
      method: 'PUT',
      // credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(state),
    });

    setState(initialState);
    if (!res.ok) {
      const message = await res.text();
      alert(message);
    } else {
      const parsedAuction = await res.json();
      console.log(parsedAuction);
      history.push(`/properties/${id}`);
    }
  };

  return (
    <div>
      <h2>Make a bid</h2>
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
        <div>
          <label>
            Purchase Price
            <input
              type="number"
              name="purchasePrice"
              placeholder="Put in your purchase price"
              value={state.purchasePrice}
              onChange={handleChange}
              style={{
                width: '100%',
                letterSpacing: '.2rem',
                height: '2rem',
                border: 'none',
                borderBottom: '1px solid grey',
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Deposit
            <input
              type="number"
              name="deposit"
              placeholder="Put in deposit amount you will put up"
              value={state.deposit}
              onChange={handleChange}
              style={{
                width: '100%',
                letterSpacing: '.2rem',
                height: '2rem',
                border: 'none',
                borderBottom: '1px solid grey',
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Due Diligence
            <input
              type="number"
              name="dueDiligence"
              placeholder="Number of due diligence days"
              value={state.dueDiligence}
              onChange={handleChange}
              style={{
                width: '100%',
                letterSpacing: '.2rem',
                height: '2rem',
                border: 'none',
                borderBottom: '1px solid grey',
              }}
            />
          </label>
        </div>
        <div>
          <label>Closing Date</label>
          <input
            type="date"
            name="closingDate"
            value={state.closingDate}
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
        <button>Place my bid!</button>
      </form>
    </div>
  );
};

export default MakeABid;
