const express = require('express');
const router = express.Router();


// Import of the Technician Controller
const Technician = require("../controllers/Technician");


// Creating the Technician
router.post("/",Technician.createTechnician);

// Getting all the Technician
router.get("/",Technician.getTechnician);

// Getting the Specific Technician
router.get("/:id",Technician.getSpecificTechnician);

// Get technician by tasknow specific id
router.post("/getTechnician",Technician.getTechnicianByTasknowId);
    
// Updating the Technician 
router.put("/:id",Technician.updateTechnician);

// Deleting the Technician 
router.delete("/:id",Technician.deleteTechnician);

router.post("/assign", Technician.getSortedTechnician);

module.exports = router;