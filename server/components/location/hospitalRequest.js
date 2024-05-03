const axios = require('axios');
const calculateDistance = require('./calculateDistance')

const PlaceURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const detailsURL = 'https://maps.googleapis.com/maps/api/place/details/json';

const hospitalRequest = async (APIKEY, location) => {
    let hospitals = [];
    try{
        const response = await axios.get(PlaceURL, {
            params: {
                key: APIKEY,
                location: `${location.lat},${location.lng}`,
                radius: 5000,
                type: 'hospital'
                // keyword: 'operation'
            }
        })
        const data = response.data;
        if(data.status === "OK") {
            hospitals = data.results;
            for (let hospital of hospitals) {
                const distance = calculateDistance(location, hospital.geometry.location);
                try {
                    const details = await detailRequest(APIKEY, hospital.place_id);
                    if (details.status === "OK") {
                        hospital.details = details.result;
                    } else {
                        console.error('Error fetching details:', details.status);
                    }
                } catch (error) {
                    console.error('Error fetching details:', error);
                }
                hospital.distance = distance;
            }
            hospitals.sort((a, b) => a.distance - b.distance);
        }
        // console.log(hospitals)
        return hospitals;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const detailRequest = async (APIKEY, place_id) => {
    try{
        const response = await axios.get(detailsURL, {
            params: {
                key: APIKEY,
                place_id: place_id,
                fields: 'name,formatted_address,formatted_phone_number,website,opening_hours'
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching details: ', error);
        throw error;
    }
};

module.exports = hospitalRequest;