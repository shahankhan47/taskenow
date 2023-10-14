// Admin for the TaskeNow business 

const Admin = require('../modals/Admin');


// Creating the Admin 
const createAdmin = async (req,res) => {
    try {
        const data = req.body;
        const newAdmin = new Admin(data);
        await newAdmin.save();
        res.status(201).json(newAdmin);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the list of All the Admin 
const getAdmin = async (req,res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Getting the Specific Admin by Id 
const getSpecificAdmin = async (req,res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.status(200).json(admin);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


const updateAdmin = async (req, res) => {
    try {
      const AdminId = req.params.id;
      const updateData = req.body;
  
      // Find the Admin by ID and update their data
      const updatedAdmin = await Admin.findByIdAndUpdate(
        AdminId,
        updateData,
        { new: true } // To return the updated document
      );
  
      if (!updatedAdmin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      // Return the updated Admin data
      res.status(200).json(updatedAdmin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  
  


// Deleting the Admin by Id 
const deleteAdmin = async (req,res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({id: req.params.id, message: "Deleted"});
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Exporting all the Categories
module.exports = { 
    createAdmin,
    getAdmin,
    getSpecificAdmin,
    updateAdmin,
    deleteAdmin
}