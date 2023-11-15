// Job for the TaskeNow business 

const Job = require('../modals/Job');
const Users = require('../modals/Users');
const Technician = require('../modals/Technician');
const ObjectId = require('mongoose').Types.ObjectId;

// Creating the Job 
const createJob = async (req,res) => {
    try {
        const data = req.body;
        const lastId = await findMostRecentJob()
        data.sequence_number = lastId + 1;
        data.taskNow_unique_id = `taske-job-${lastId + 1}`;
        if (data.technician.id !== "") {
            data.technician.taskNow_unique_id = data.technician.id
        }

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
        const job = await Job.find({"technician.id": req.params.id});
        res.status(200).json(job);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Getting the Specific Job by Id 
const getSpecificJob = async (req,res) => {
    try {
        const job = await Job.findOne({taskNow_unique_id: req.body.jobId});
        res.status(200).json(job);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


const updateJob = async (req, res) => {
    try {
      const {JobId, updateData} = req.body;
  
      // Find the Job by ID and update their data
      const updatedJob = await Job.findOneAndUpdate({taskNow_unique_id: JobId}, updateData, {new: true});
  
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
        await Job.findOneAndDelete({taskNow_unique_id: req.body.jobId});
        const userWithJob = await Users.findOne({
            email: req.body.customerEmail,
            phone: req.body.customerPhoneNumber
        })
        const updatedJobs = userWithJob.booked_jobs.filter(job => job._id.toString() !== req.body.jobId);
        userWithJob.booked_jobs = updatedJobs;
        const updatedUser = await Users.findByIdAndUpdate(userWithJob._id, userWithJob, {new: true})
        res.status(200).json({User: updatedUser._id});
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

const getDateString = (date) => {
    return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
}

const getJobsofType = async(req, res) => {
    try {
        const jobs = await Job.find({"job.type": req.body.type});
        const inspectionJob = jobs.map((job) => {
            return {
                jobId: job?.taskNow_unique_id,
                service: job?.job?.service || job?.job?.description,
                date: getDateString(job?.job?.dateOfJob),
                status: job?.job?.status?.assigned,
                details: job?.job?.description,
                customerName: `${job?.customer?.firstName} ${job?.customer?.lastName}`,
                customerAddress: job?.customer?.addressLine1,
                customerPhoneNumber: job?.customer?.phone,
                customerEmail: job?.customer?.email,
                jobDetails: job?.job?.service || job?.job?.description,
                jobAssignedStatus: job?.job?.status?.assigned,
                technicianStatus: job?.job?.status?.technician,
                customerStatus: job?.job?.status?.customer,
                cost: job?.job?.cost,
                technicianAssigned: (job?.technician?.id === "" || job?.technician?.id == null) ? false: true,
                technicianName: job?.technician?.firstName,
                technicianId: job?.technician?.taskNow_unique_id,
                customerZip: job?.customer?.zip,
                customerState: job?.customer?.state,
                originalJob: job
            }
          })
        res.status(200).json(inspectionJob);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

const getInspectionJobsOfTechnician = async(req, res) => {
    try {
        const technician = await Technician.findOne({$or: [{_id: new ObjectId(req.body.id)}, {"taskNow_unique_id": req.body.id}]});
        const jobs = await Job.find({"job.type": "Inspection", "technician.id": technician?.taskNow_unique_id});
        const inspectionJob = jobs.map((job) => {
            return {
                jobId: job?.taskNow_unique_id,
                service: job?.job?.service || job?.job?.description,
                date: getDateString(job?.job?.dateOfJob),
                status: job?.job?.status?.assigned,
                details: job?.job?.description,
                customerName: `${job?.customer?.firstName} ${job?.customer?.lastName}`,
                customerAddress: job?.customer?.addressLine1,
                customerPhoneNumber: job?.customer?.phone,
                customerEmail: job?.customer?.email,
                jobDetails: job?.job?.service || job?.job?.description,
                jobAssignedStatus: job?.job?.status?.assigned,
                technicianStatus: job?.job?.status?.technician,
                customerStatus: job?.job?.status?.customer,
                cost: job?.job?.cost,
                technicianAssigned: job?.technician?.id === "" ? false: true,
                technicianName: job?.technician?.firstName,
                technicianId: job?.technician?.taskNow_unique_id,
                customerZip: job?.customer?.zip,
                customerState: job?.customer?.state,
                originalJob: job
            }
          })
        res.status(200).json(inspectionJob);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

const getRepairJobsOfTechnician = async(req, res) => {
    try {
        const technician = await Technician.findOne({$or: [{_id: new ObjectId(req.body.id)}, {"taskNow_unique_id": req.body.id}]});
        const jobs = await Job.find({"job.type": "Repairing", "technician.id": technician?.taskNow_unique_id});
        const inspectionJob = jobs.map((job) => {
            return {
                jobId: job?.taskNow_unique_id,
                service: job?.job?.service || job?.job?.description,
                date: getDateString(job?.job?.dateOfJob),
                status: job?.job?.status?.assigned,
                details: job?.job?.description,
                customerName: `${job?.customer?.firstName} ${job?.customer?.lastName}`,
                customerAddress: job?.customer?.addressLine1,
                customerPhoneNumber: job?.customer?.phone,
                customerEmail: job?.customer?.email,
                jobDetails: job?.job?.service || job?.job?.description,
                jobAssignedStatus: job?.job?.status?.assigned,
                technicianStatus: job?.job?.status?.technician,
                customerStatus: job?.job?.status?.customer,
                cost: job?.job?.cost,
                technicianAssigned: job?.technician?.id === "" ? false: true,
                technicianName: job?.technician?.firstName,
                technicianId: job?.technician?.taskNow_unique_id,
                customerZip: job?.customer?.zip,
                customerState: job?.customer?.state,
                originalJob: job
            }
          })
        res.status(200).json(inspectionJob);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

const findMostRecentJob = async (req, res) => {
    try {
      // Find the most recent admin based on the createdAt field in descending order
      const mostRecentJob = await Job.findOne().sort({ sequence_number: -1 });
      
      if(mostRecentJob===null){
        return 0;
      }
      return mostRecentJob.sequence_number;
    } catch (error) {
       return null;
    }
};

// Exporting all the Categories
module.exports = {
    createJob,
    getJob,
    getSpecificJob,
    updateJob,
    deleteJob,
    getTechnicianJobList,
    getJobsofType,
    getInspectionJobsOfTechnician,
    getRepairJobsOfTechnician
}
