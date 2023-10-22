// Technician for the TaskeNow business 

const Technician = require('../modals/Technician');
const {getCoordinates, getDistance} = require('../utils/geo-location');


// Creating the Technician 
const createTechnician = async (req,res) => {
    try {
        const tech = req.body;
        const {latitude, longitude} = await getCoordinates(tech.zip);
        tech.latitude = latitude;
        tech.longitude = longitude;

        const lastId = await findMostRecentTechnician()
        tech.sequence_number = lastId + 1;
        tech.taskNow_unique_id = `taske-tech-${lastId + 1}`;

        const newTechnician = new Technician(tech);
        await newTechnician.save();
        res.status(201).json(newTechnician);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the list of All the Technician 
const getTechnician = async (req,res) => {
    try {
        const technician = await Technician.find();
        res.status(200).json(technician);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Getting the Specific Technician by Id 
const getSpecificTechnician = async (req,res) => {
    try {
        const technician = await Technician.findById(req.params.id);
        res.status(200).json(technician);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


const updateTechnician = async (req, res) => {
    try {
      const technicianId = req.params.id;
      const updateData = req.body;
  
      // Find the technician by ID and update their data
      const updatedTechnician = await Technician.findByIdAndUpdate(
        technicianId,
        updateData,
        { new: true } // To return the updated document
      );
  
      if (!updatedTechnician) {
        return res.status(404).json({ error: 'Technician not found' });
      }
  
      // Return the updated technician data
      res.status(200).json(updatedTechnician);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Deleting the Technician by Id 
const deleteTechnician = async (req,res) => {
    try {
        await Technician.findByIdAndDelete(req.params.id);
        res.status(200).json({id: req.params.id, message: "Deleted"});
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


const findMostRecentTechnician = async (req, res) => {
    try {
      // Find the most recent admin based on the createdAt field in descending order
      const mostRecentTechnician = await Technician.findOne().sort({ sequence_number: -1 });
      
      if(mostRecentTechnician===null){
        return 0;
      }
      return mostRecentTechnician.sequence_number;
    } catch (error) {
       return null;
    }
};


const getSortedTechnician = async (req, res) => {
  try {
    const {latitude, longitude} = await getCoordinates(req.body.zip);
    let nearest_technician = [];
    const technicians = await Technician.find({state: req.body.state}).exec();

    technicians.forEach((technician) => {
        const distance = getDistance(latitude, longitude, technician.latitude, technician.longitude);
        console.log("Distance: ", distance);
        // finding the distance between the technician address and the user address and if the distance is under the working 
        // area of the technician then the technician is added to the list for further evaluation 
        console.log(latitude);
        console.log(longitude);
        console.log("________________________________");
        console.log(technician.latitude);
        console.log(technician.longitude);
        nearest_technician.push(technician);

        // Not sure how to implement this logic:
        if (distance <= (technician?.miles_distance == 0 ? 10 : technician?.miles_distance)) {
            nearest_technician.push(technician);
            
        }
    });

    if(nearest_technician.length > 0 ) {
        res.status(200).json(nearest_technician);
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

// Exporting all the Categories
module.exports = {
    createTechnician,
    getTechnician,
    getSpecificTechnician,
    updateTechnician,
    deleteTechnician,
    getSortedTechnician
}