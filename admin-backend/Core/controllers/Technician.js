// Technician for the TaskeNow business 

const Technician = require('../modals/Technician');
const {getCoordinates} = require('../utils/geo-location');


// Creating the Technician 
const createTechnician = async (req,res) => {
    try {
        const tech = req.body;
        const {latitude, longitude} = await getCoordinates(tech.zip);
        tech.latitude = latitude;
        tech.longitude = longitude;
        const lastId = await findMostRecentTechnician()
        if (lastId === 0) {
            tech.taskNow_unique_id = `taske-tech-${lastId}`
        }
        else {
            tech.sequence_number = lastId + 1;
            tech.taskNow_unique_id = `taske-tech-${lastId + 1}`;
        }
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

// Exporting all the Categories
module.exports = { 
    createTechnician,
    getTechnician,
    getSpecificTechnician,
    updateTechnician,
    deleteTechnician
}