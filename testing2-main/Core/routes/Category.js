const express = require('express');
const router = express.Router();


// Import of the Category Controller
const Category = require("../controllers/Category");


// Creating the Category
router.post("/",Category.createCategory);

// Getting all the Category
router.get("/",Category.getCategory);

// Getting the Specific Category
router.get("/:id",Category.getSpecificCategory);

// Updating the Category 
router.put("/:id",Category.updateCategory);

// Deleting the Category 
router.delete("/:id",Category.deleteCategory);


module.exports = router;