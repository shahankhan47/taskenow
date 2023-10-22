// Get coordinates for the given address using OpenStreetMap
const axios = require('axios');

async function getCoordinates(zip) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${zip}&format=json`);
        const { data } = response;
        return {
            latitude: data[0]?.lat,
            longitude: data[0]?.lon
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error getting coordinates');
    }
}

// We have used Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth's radius in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
// Convert degrees to radian
function toRadians(degrees) {
    const radians = (degrees * Math.PI) / 180;
    return radians;
}


module.exports = {
    getCoordinates,
    getDistance
}