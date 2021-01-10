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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('address', JSON.stringify(address));
    formData.append('description', JSON.stringify(description));
    formData.append('startPrice', JSON.stringify(startPrice));
    formData.append('auctionEndTime', JSON.stringify(auctionEndTime));
    formData.append('file', file, file.name);
    console.log([...formData.entries()]);
    try {
      axios.post(`${REACT_APP_SERVER_URL}/listproperty`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('accessToken'),
        },
      });
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
        <input
          type="text"
          value={address.street}
          onChange={handleAddressChange}
          name="street"
          placeholder="Enter street"
          required
        />
        <input
          type="text"
          value={address.city}
          onChange={handleAddressChange}
          name="city"
          placeholder="Enter city"
          required
        />
        <input
          type="text"
          value={address.state}
          onChange={handleAddressChange}
          name="state"
          placeholder="Enter state"
          required
        />
        <input
          type="text"
          value={address.zip}
          onChange={handleAddressChange}
          name="zip"
          placeholder="Enter zip"
          required
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          name="description"
          placeholder="Enter description"
          resize="vertical"
          required
        />
        <input
          type="number"
          value={startPrice}
          onChange={handleStartPriceChange}
          name="startPrice"
          placeholder="Enter start price for the auction"
          min="0" //validation added to prevent inputting negative number
          required
        />
        <input
          type="date"
          value={auctionEndTime}
          onChange={handleAuctionEndTimeChange}
          name="auctionEndTime"
          min={new Date().toJSON().slice(0, 10)}
          required
        />
        <br />
        <input type="file" onChange={handlePhotoSelect} />
        {/* <input type="submit" value="click"></input> */}
        <button>List My Property!</button>
      </form>
    </div>
  );
};

export default ListProperty;
