// Users/Customers for the TaskeNow business 

const User = require('../modals/Users');


// Creating the Admin 
const createUser = async (req,res) => {
    try {
        const data = req.body;
        const lastId = await findMostRecentUser()
        
        data.sequence_number = lastId + 1;
        data.taskNow_unique_id = `taske-user-${lastId + 1}`;

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
        return res.status(404).json({ error: 'User not found' });
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

const bookJob = async(req, res) => {
    try {
        const {firstName, lastName, email, phone} = req.body.customer;
        const user = await User.findOne({
            firstName,
            lastName,
            email,
            phoneNumber: phone
        });
        user.booked_jobs.push(req.body.jobId);
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

const findMostRecentUser = async (req, res) => {
    try {
      // Find the most recent admin based on the createdAt field in descending order
      const mostRecentUser = await User.findOne().sort({ sequence_number: -1 });
      
      if(mostRecentUser===null){
        return 0;
      }
      return mostRecentUser.sequence_number;
    } catch (error) {
       return null;
    }
};

const getUserbyDetails = async (req, res) => {
    try {
        const {firstName, lastName, email, phone} = req.body;
        const user = await User.findOne({
            firstName,
            lastName,
            email,
            phoneNumber: phone
        });
        return res.status(200).json(user);
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
    bookJob,
    deleteUser,
    getUserbyDetails
}