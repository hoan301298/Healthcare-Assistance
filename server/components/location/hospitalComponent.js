const axios = require('axios');
require('dotenv').config();
const hospitalRequest = require('./hospitalRequest');

const APIKEY = process.env.GOOGLE_MAP_API_KEY;
const GeocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json';

const hospitalController = async (req, res) => {
    const address = req.body.address;
    try {
        const response = await axios.get(GeocodeURL, {
            params: {
                address: address,
                key: APIKEY
            }
        });
        const location = response.data.results[0].geometry.location;
        // console.log(location)
        const hospitals = await hospitalRequest(APIKEY, location);
        // console.log(hospitals);
        if (hospitals != null) {
            for(let hospital of hospitals) {
                delete hospital['business_status']
                delete hospital['photos']
                delete hospital['plus_code']
                delete hospital['rating']
                delete hospital['reference']
                delete hospital['scope']
                delete hospital['types']
                delete hospital['user_ratings_total']
                delete hospital['vicinity']
                delete hospital['icon']
                delete hospital['icon_background_color']
                delete hospital['icon_mask_base_uri']
                delete hospital['name']
                delete hospital['opening_hours']
            }
            const newHospitals = hospitals.map((item, index) => ({ id: index, name: item.details['name'] ,information: item}));
            res.json(newHospitals);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = hospitalController;