const express = require('express');
const router = express.Router();


// Import of the Admin Controller
const Admin = require("../controllers/Admin");


// Creating the Admin
router.post("/",Admin.createAdmin);

// Getting all the Admin
router.get("/",Admin.getAdmin);

// Getting the Specific Admin
router.get("/:id",Admin.getSpecificAdmin);
    
// Updating the Admin 
router.put("/:id",Admin.updateAdmin);

// Deleting the Admin 
router.delete("/:id",Admin.deleteAdmin);


module.exports = router;