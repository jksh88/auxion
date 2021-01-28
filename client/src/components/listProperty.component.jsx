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
  const [files, setFiles] = useState([]);

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
    setFiles(Array.from(evt.target.files));
    // console.log('EVT.TGT.FILES: ', evt.target.files);
    // setFilename(evt.target.files[0].name);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('address', JSON.stringify(address));
    formData.append('description', JSON.stringify(description));
    formData.append('startPrice', JSON.stringify(startPrice));
    formData.append('auctionEndTime', JSON.stringify(auctionEndTime));

    files.forEach((file) => formData.append('file[]', file, file.name));
    //https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
    //sticking '[]' at the end for the browser to understand that it is an array (look at the examples part for the above doc. PHP convention but formData standard comes from PHP anyways. It's just like JSON is a convention of JS but used by other languages. Same thing)
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
          <label htmlFor="street">
            Street
            <input
              type="text"
              value={address.street}
              onChange={handleAddressChange}
              name="street"
              id="street"
              placeholder="Enter street"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="city">
            City
            <input
              type="text"
              value={address.city}
              onChange={handleAddressChange}
              name="city"
              us="city"
              placeholder="Enter city"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="state">
            State
            <input
              type="text"
              value={address.state}
              onChange={handleAddressChange}
              name="state"
              id="state"
              placeholder="Enter state"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="zip">
            Zip
            <input
              type="text"
              value={address.zip}
              onChange={handleAddressChange}
              name="zip"
              id="zip"
              placeholder="Enter zip"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              id="description"
              placeholder="Enter description"
              resize="vertical"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="startPrice">
            Start Price
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
          </label>
        </div>
        <div>
          <label htmlFor="auctionEndTime">
            Auction End Time
            <input
              type="date"
              value={auctionEndTime}
              onChange={handleAuctionEndTimeChange}
              name="auctionEndTime"
              id="auctionEndTime"
              min={new Date().toJSON().slice(0, 10)}
              required
            />
          </label>
        </div>
        <br />
        <input
          type="file"
          multiple={true}
          onChange={handlePhotoSelect}
          accept="image/*"
        />
        {/*To enable multiple file uplaod, set multiple attribute to true(Don't do quotes. Wrap true in curly braces) */}
        {/* <input type="submit" value="click"></input> */}
        <br />
        <button>List My Property!</button>
      </form>
    </div>
  );
};

export default ListProperty;
