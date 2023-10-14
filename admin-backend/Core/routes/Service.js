const express = require('express');
const router = express.Router();


// Import of the Service Controller
const Service = require("../controllers/Service");


// Creating the Service
router.post("/",Service.createService);

// Getting all the Service
router.get("/",Service.getService);

// Getting the Specific Service
router.get("/:id",Service.getSpecificService);
    
// Updating the Service 
router.put("/:id",Service.updateService);

// Deleting the Service 
router.delete("/:id",Service.deleteService);


module.exports = router;