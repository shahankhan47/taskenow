const express = require('express');
const router = express.Router();


// Import of the Admin Controller
const Users = require("../controllers/Users");


// Creating the Admin
router.post("/",Users.createUser);

// Getting all the Admin
router.get("/",Users.getUser);

// Getting the Specific Admin
router.get("/:id",Users.getSpecificUser);

router.post("/getuser", Users.getUserbyDetails);
    
// Updating the Admin 
router.put("/:id",Users.updateUser);

//Book a job for user
router.post("/bookjob", Users.bookJob);

// Deleting the Admin 
router.delete("/:id",Users.deleteUser);


module.exports = router;