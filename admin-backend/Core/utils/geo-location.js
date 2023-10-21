// Get coordinates for the given address using OpenStreetMap
const axios = require('axios');
const technicianAvailability = async (req,res) => {
    try {
          const { addressLine1, addressLine2, zip, state , city } = req.body;
        
            const geo = await getCoordinates(addressLine1, addressLine2, zip ,city, state);
          const userLatitude = geo.latitude;
          const userLongitude = geo.longitude;
         let nearest_technician = [];
          const technicians = await Technicain.find({state: state }).exec();

         technicians.forEach((technician) => {
            const distance = getDistance(userLatitude, userLongitude, technician.latitude, technician.longitude);
            // finding the distance between the technician address and the user address and if the distance is under the working 
            // area of the technician then the technician is added to the list for further evaluation 
            console.log(userLatitude);
             console.log(userLongitude);
             console.log("________________________________");
             console.log(technician.latitude);
             console.log(technician.longitude);
            if (distance <= technician.miles_distance) {
                nearest_technician.push({
                    technician: technician,
                    distance: distance
                });
                
            }
        });

        if(nearest_technician.length > 0 ) {
            res.status(200).json({status:true});
        }
       else
        {
             res.status(200).json({status:false});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error)
    }

    }


async function getCoordinates(zip) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${zip}&format=json`);
        const { data } = response;
        return {
            latitude: data[0].lat,
            longitude: data[0].lon
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
    console.log(distance)
    return distance;
}
// Convert degrees to radian
function toRadians(degrees) {
    const radians = (degrees * Math.PI) / 180;
    return radians;
}


module.exports = {
    technicianAvailability,
    getCoordinates,
    getDistance
}