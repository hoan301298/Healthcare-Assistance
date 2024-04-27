import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import '../../css/map.css';
import HospitalList from './HospitalList';
import axios from 'axios';
const APIKey = process.env.API_KEY;

const MapComponent = () => {
  const [address, setAddress] = useState("");
  const [hospitals, setHospitals] = useState(null);
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 62.8980, 
      lng: 27.6782
    },
    zoom: 5
  })

  const postDataLocation = {
    address: address
  }
  const handleButtonClick = async (e) => {
    e.preventDefault();
    await axios.post('/location', postDataLocation)
      .then(response => setHospitals(response.data))
      .catch(error => console.error('Error fetching data:', error))    
  };

  return (
    <div className='geolocation-service'>
      <div className='map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIKey}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* <AnyReactComponent
            
          /> */}
        </GoogleMapReact>
      </div>
      <div className='input-location'>
        <form onSubmit={handleButtonClick}>
          <h3>Please let us know your location:</h3>
          <input type="text" placeholder='Write your location' value={address} onChange={(e) => setAddress(e.target.value)} required />
          <button type='submit'>Select</button>
        </form>
        <p>-----------------------------------------------------------------------------</p>
        {hospitals && <HospitalList hospitals={hospitals}/>}  
      </div>
    </div>
  );
};

export default MapComponent;