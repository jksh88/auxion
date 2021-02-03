import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './editListingTerms.styles.css';

const { REACT_APP_SERVER_URL } = process.env;

//TODO: This component written based on assumption of whole property as a prop.
//Make another fetch to backend and use database as the signle source of truth in an edit component. Receiving state as props from parent is not reliable.
const EditListingTerms = (props) => {
  const [property, setProperty] = useState(null);
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(true);
  const [files, setFiles] = useState([]);
  const [auctionEndTime, setAuctionEndTime] = useState(
    new Date().toJSON().slice(0, 10)
  );

  const { id } = props.match.params;
  const { history } = props;
  console.log('HISTORY AT EDIT: ', history);

  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_URL}/properties/${id}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        prePopulateForm(res.data);
        console.log('DATA FROM EDIT COMP: ', res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleAvailableChange = (evt) => {
    console.log('VALUE :', evt.target.value);
    setAvailable(JSON.parse(evt.target.value));
  };

  const handleAuctionEndTimeChange = (evt) => {
    setAuctionEndTime(evt.target.value);
  };

  const handlePhotoSelect = (evt) => {
    setFiles(Array.from(evt.target.files));
    // console.log('EVT.TGT.FILES: ', evt.target.files);
    // setFilename(evt.target.files[0].name);
  };

  const prePopulateForm = (property) => {
    setProperty(property);

    setDescription(property.description);

    setAvailable(property.available);
    setAuctionEndTime(property.auction.auctionEndTime.slice(0, 10));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('description', JSON.stringify(description));
    formData.append('available', JSON.stringify(available));
    formData.append('auctionEndTime', JSON.stringify(auctionEndTime));

    files.forEach((file) => formData.append('file[]', file, file.name));
    //https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
    //sticking '[]' at the end for the browser to understand that it is an array (look at the examples part for the above doc. PHP convention but formData standard comes from PHP anyways. It's just like JSON is a convention of JS but used by other languages. Same thing)
    console.log([...formData.entries()]);
    try {
      const response = await axios.patch(
        `${REACT_APP_SERVER_URL}/properties/${props.match.params.id}/edit`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      console.log('RESPONSE FOR EDITPROPERTY: ', response);
      const { _id } = response.data;

      console.log('_ID HERE: ', _id);
      // console.log('HISTORY HERE: ', history);
      history.push(`/properties/${_id}`); //Don't forget '/' before url //Q: Why does this run twice? Look at url address on broswer. A: It's not that it's running twice. If I forget '/' before the pathname, it apends the url to whatever was there before, which makes it look like it's run twice.
    } catch (err) {
      console.log(err);
    }
  };

  console.log('AVAIL', available);

  return (
    // <div>
    //   <h2>Property Listing Form</h2>
    //   <span>Provide property address and Photo</span>

    <>
      {property && (
        <form onSubmit={handleSubmit}>
          <div className="available">
            <div>
              <label htmlFor="available-radio">Available</label>
              <input
                id="available-radio"
                value={true}
                checked={available}
                onChange={handleAvailableChange}
                type="radio"
              />
            </div>
            <div>
              <label htmlFor="unavailable-radio">Unavailable</label>
              <input
                id="available-radio"
                value={false}
                checked={!available}
                onChange={handleAvailableChange}
                type="radio"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">Description </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              id="description"
              placeholder="Enter description"
              required
            />
          </div>

          <div>
            <label htmlFor="auctionEndTime">Auction End Time</label>
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
          <div>
            <input
              type="file"
              multiple={true}
              onChange={handlePhotoSelect}
              accept="image/*"
            />
          </div>
          {/*To enable multiple file uplaod, set multiple attribute to true(Don't do quotes. Wrap true in curly braces) */}
          {/* <input type="submit" value="click"></input> */}
          <br />
          <button>Submit my edits</button>
        </form>
      )}
    </>
  );
};

export default EditListingTerms;
