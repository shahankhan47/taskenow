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
const updateCategory = async (req,res) => {
    try {
        const {category_name,category_code} = req.body;
        const category = Category.findByIdAndUpdate(req.params.id,{
            category_name,
            category_code
        },{new : true});
        res.status(200).json(category)
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Deleting the Category by Id 
const deleteCategory = async (req,res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
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