import React, { useState } from 'react';
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

const initialAddress = {
  street: '',
  city: '',
  state: '',
  zip: '',
};
const ListProperty = (props) => {
  const [address, setAddress] = useState(initialAddress);
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState('0');
  const [auctionEndTime, setAuctionEndTime] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const [file, setFile] = useState(null);

  const { history } = props;

  const handleAddressChange = (evt) => {
    setAddress({ ...address, [evt.target.name]: evt.target.value });
  };
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };
  const handleStartPriceChange = (evt) => {
    setStartPrice(evt.target.value);
  };
  const handleAuctionEndTimeChange = (evt) => {
    setAuctionEndTime(evt.target.value);
  };

  const handlePhotoSelect = (evt) => {
    setFile(evt.target.files[0]);
    // setFilename(evt.target.files[0].name);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('address', JSON.stringify(address));
    formData.append('description', JSON.stringify(description));
    formData.append('startPrice', JSON.stringify(startPrice));
    formData.append('auctionEndTime', JSON.stringify(auctionEndTime));
    formData.append('file', file, file.name);
    console.log([...formData.entries()]);
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/listproperty`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      console.log('RESPONSE FOR LISTPROPERTY: ', response);
      const { _id } = response.data;

      console.log('_ID HERE: ', _id);
      // console.log('HISTORY HERE: ', history);
      history.push(`properties/${_id}`);
    } catch (err) {
      console.log(err);
    }
  };
  //   fetch(`http://localhost:8000/listproperty'`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     body: formData,
  //   });
  // };
  return (
    <div>
      <h2>Property Listing Form</h2>
      <span>Provide property address and Photo</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="street">Street </label>
          <input
            type="text"
            value={address.street}
            onChange={handleAddressChange}
            name="street"
            id="street"
            placeholder="Enter street"
            required
          />
        </div>
        <div>
          <label htmlFor="city">City </label>
          <input
            type="text"
            value={address.city}
            onChange={handleAddressChange}
            name="city"
            us="city"
            placeholder="Enter city"
            required
          />
        </div>
        <div>
          <label htmlFor="state">State </label>
          <input
            type="text"
            value={address.state}
            onChange={handleAddressChange}
            name="state"
            id="state"
            placeholder="Enter state"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={address.zip}
            onChange={handleAddressChange}
            name="zip"
            id="zip"
            placeholder="Enter zip"
            required
          />
        </div>
        <div>
          <label htmlFor="zip">Zip </label>
          <label htmlFor="description">Description </label>
        </div>
        <div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            name="description"
            id="description"
            placeholder="Enter description"
            resize="vertical"
            required
          />
        </div>
        <div>
          <label htmlFor="startPrice">Start Price </label>
          <input
            type="number"
            value={startPrice}
            onChange={handleStartPriceChange}
            name="startPrice"
            id="startPrice"
            placeholder="Enter start price for the auction"
            min="0" //validation added to prevent inputting negative number
            required
          />
        </div>
        <div>
          <label htmlFor="auctionEndTime">Auction End Time </label>
          <input
            type="date"
            value={auctionEndTime}
            onChange={handleAuctionEndTimeChange}
            name="auctionEndTime"
            id="auctionEndTime"
            min={new Date().toJSON().slice(0, 10)}
            required
          />
        </div>
        <br />
        <input type="file" onChange={handlePhotoSelect} />
        {/* <input type="submit" value="click"></input> */}
        <br />
        <button>List My Property!</button>
      </form>
    </div>
  );
};

export default ListProperty;
