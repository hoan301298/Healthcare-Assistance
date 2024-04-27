const geolib = require('geolib')

const calculateDistance = (currentPosition, hospitalLocation) => {
    return geolib.getDistance(currentPosition, hospitalLocation);
}

module.exports = calculateDistance;