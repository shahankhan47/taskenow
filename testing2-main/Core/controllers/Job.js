// Job for the TaskeNow business 

const Job = require('../modals/Job');


// Creating the Job 
const createJob = async (req,res) => {
    try {
        const data = req.body;
        const newJob = new Job(data);
        await newJob.save();
        res.status(201).json(newJob);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the list of All the Job 
const getJob = async (req,res) => {
    try {
        const job = await Job.find();
        res.status(200).json(job);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the list of Jobs for the Particular Technician 
const getTechnicianJobList = async(req,res) => {
       try {
        console.log("Hello");
        const job = await Job.find({technician:req.params.id});
        res.status(200).json(job);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Getting the Specific Job by Id 
const getSpecificJob = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json(job);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


const updateJob = async (req, res) => {
    try {
      const JobId = req.params.id;
      const updateData = req.body;
  
      // Find the Job by ID and update their data
      const updatedJob = await Job.findByIdAndUpdate(
        JobId,
        updateData,
        { new: true } // To return the updated document
      );
  
      if (!updatedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }
  
      // Return the updated Job data
      res.status(200).json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  
  


// Deleting the Job by Id 
const deleteJob = async (req,res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Exporting all the Categories
module.exports = { 
    createJob,
    getJob,
    getSpecificJob,
    updateJob,
    deleteJob,
    getTechnicianJobList
}
