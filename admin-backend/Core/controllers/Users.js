// Users/Customers for the TaskeNow business 

const User = require('../modals/Users');


// Creating the Admin 
const createUser = async (req,res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the list of All the Admin 
const getUser = async (req,res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the Specific Admin by Id 
const getSpecificUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

const updateUser = async (req, res) => {
    try {
      const UserId = req.params.id;
      const updateData = req.body;
  
      // Find the Admin by ID and update their data
      const updatedUser = await User.findByIdAndUpdate(
        UserId,
        updateData,
        { new: true } // To return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      // Return the updated Admin data
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Deleting the Admin by Id 
const deleteUser = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({id: req.params.id, message: "Deleted"});
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Exporting all the Categories
module.exports = { 
    createUser,
    getUser,
    getSpecificUser,
    updateUser,
    deleteUser
}