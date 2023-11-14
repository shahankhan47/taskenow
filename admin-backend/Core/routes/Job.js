const express = require('express');
const router = express.Router();


// Import of the Job Controller
const Job = require("../controllers/Job");

// Creating the Job
router.post("/", Job.createJob);

// Getting all the Job
router.get("/", Job.getJob);

// Getting the Job for the Specific Technician - TODO check this out
router.get("/tech/:id", Job.getTechnicianJobList);

// Getting the Specific Job
router.post("/getJob", Job.getSpecificJob);

// Updating the Job 
router.post("/updateJob", Job.updateJob);

// Deleting the Job 
router.post("/deleteJob", Job.deleteJob);

// Getting the Specific type of Job
router.post("/type", Job.getJobsofType);

// Getting inspection type job of a technician
router.post("/inspection", Job.getInspectionJobsOfTechnician);

// Getting repair type job of a technician
router.post("/repair", Job.getRepairJobsOfTechnician);

module.exports = router;
