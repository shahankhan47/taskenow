// Technician for the TaskeNow business 

const Technician = require('../modals/Technician');


// Creating the Technician 
const createTechnician = async (req,res) => {
    try {
        const {firstName,lastName,email,phoneNumber,password} = req.body;
        const newTechnician = new Technician({
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });
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

// Exporting all the Categories
module.exports = { 
    createTechnician,
    getTechnician,
    getSpecificTechnician,
    updateTechnician,
    deleteTechnician
}