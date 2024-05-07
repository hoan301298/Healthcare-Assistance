import React, { useState } from 'react';
import MapComponent from './MapComponent';
import HospitalList from './HospitalList';
import '../../css/Map.css';
import axios from 'axios';

const APIKEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const SearchService = () => {
  
  const [address, setAddress] = useState("");
  const [hospitals, setHospitals] = useState(null);

  const postDataLocation = {
    address: address
  }

  const handleButtonClick = async (e) => {
    e.preventDefault();
    await axios.post('/location', postDataLocation)
      .then(response => {setHospitals(response.data)})
      .catch(error => console.error('Error fetching data:', error))
  };

  return (
    <div className='geolocation-service'>
      <div className='map'>
        <MapComponent APIKEY={APIKEY} hospitals = {hospitals} address={address}/>
      </div>
      <div className='input-location'>
        <form onSubmit={handleButtonClick}>
          <h3>Please let us know your location:</h3>
          <input type="text" placeholder='Write your location' value={address} onChange={(e) => setAddress(e.target.value)} required />
          <button type='submit'>Select</button>
        </form>
        <p>--------------------------------------------------------------</p>
        {hospitals && <HospitalList hospitals={hospitals}/>}  
      </div>
    </div>
  );
};

export default SearchService;