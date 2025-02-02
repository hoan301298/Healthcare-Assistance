import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const GeocodeURL = process.env.REACT_APP_GEOCODE_URL;

const MapComponent = ({ APIKEY, hospitals, address }) => {
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [defaultProps, setDefaultProps] = useState({});
    
    useEffect(() => {
        const fetchGeoCode = async () => {
            try {
                const location = address && address.trim() !== "" ? address : "Finland"; // Default to Finland if address is null or empty

                const response = await axios.get(GeocodeURL, {
                    params: {
                        address: location,
                        key: APIKEY,
                    },
                });

                setDefaultProps({
                    center: response.data.results[0].geometry.location,
                    zoom: address==""? 8 : 13,
                });

            } catch (error) {
                console.error("Error fetching geocode", error);
            }
        };
        fetchGeoCode();
    }, [address])

    const containerStyle = {
        height: '50vh',
        width: '80vh'
    };

    const handleMarkerClick = (hospital) => {
        setSelectedHospital(hospital);
    }

    return (
    <LoadScript
        googleMapsApiKey={APIKEY}
    >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultProps.center}
            zoom={defaultProps.zoom}
        >
            {hospitals && hospitals.map((hospital, index) => (
                <Marker 
                    key={index}
                    position={hospital.information.geometry.location}
                    title="Marker"
                    onClick={() => handleMarkerClick(hospital)}
                />
            ))}

            {selectedHospital && (
                <InfoWindow
                    key={selectedHospital.information.place_id}
                    position={selectedHospital.information.geometry.location}
                    onCloseClick={() => setSelectedHospital(null)}
                >
                    <div>
                        <h3>{selectedHospital.name}</h3>
                        <p>{selectedHospital.information.details.formatted_address}</p>
                        {selectedHospital.information.distance/1000}km
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    </LoadScript>
    )
}

export default MapComponent;