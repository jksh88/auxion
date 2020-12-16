import React, { useState } from 'react';
import axios from 'axios';

const { PUBLIC_SERVER_URL } = process.env;

const ListProperty = (props) => {
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('Choose File');
  // const { address, selectedPhoto } = propertyInfo;
  // const formData = new FormData();

  const handleAddressChange = (evt) => {
    setAddress(evt.target.value);
  };

  const handlePhotoSelect = (evt) => {
    setFile(evt.target.files[0]);
    setFilename(evt.target.files[0].name);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('address', address);
    formData.append('upload', filename);
    console.log(formData);
    try {
      axios.post(`${PUBLIC_SERVER_URL}/listproperty`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.log(err);
    }
    //   fetch(`http://localhost:3000/listproperty'`, {
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
            value={address}
            onChange={handleAddressChange}
            name={address}
            placeholder="Enter address"
          />
          <br />
          <input type="file" onChange={handlePhotoSelect} />
          {/* <input type="submit" value="click"></input> */}
          <CustomButton>List My Property!</CustomButton>
        </form>
      </div>
    );
  };
};

export default ListProperty;
