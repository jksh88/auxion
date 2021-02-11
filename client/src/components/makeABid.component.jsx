import React, { useState } from 'react';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const MakeABid = (props) => {
  // console.table('PROPS.LOCATION: ', props.location);
  const [bid] = props.location.state;
  const initialState = {
    purchasePrice: bid?.purchasePrice || 0, //because bid can be undefined, I need to use optional(or conditional) chaining.
    deposit: bid?.deposit || 0,
    dueDiligence: bid?.dueDiligence || 0,
    closingDate: new Date(bid?.closingDate || Date.now()).toJSON().slice(0, 10),
  };
  const [state, setState] = useState(initialState);
  // const history = useHistory();
  const { history } = props;

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
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>
            Purchase Price
            <input
              type="number"
              name="purchasePrice"
              placeholder="Put in your purchase price"
              value={state.purchasePrice}
              onChange={handleChange}
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
