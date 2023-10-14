// Category for the TaskeNow business 

const Category = require('../modals/Category');


// Creating the Category 
const createCategory = async (req,res) => {
    try {
        const {category_name,category_code} = req.body;
        const newCategory = new Category({
            category_name,
            category_code
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the list of All the Category 
const getCategory = async (req,res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Getting the Specific Category by Id 
const getSpecificCategory = async (req,res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Updating the Category by Id 
const updateCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
  
      // Find the technician by ID and update their data
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // To return the updated document
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Technician not found' });
      }
  
      // Return the updated technician data
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


// Deleting the Category by Id 
const deleteCategory = async (req,res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({id: req.params.id, message: "Deleted"});
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Exporting all the Categories
module.exports = { 
    createCategory,
    getCategory,
    getSpecificCategory,
    updateCategory,
    deleteCategory
}