// service for the TaskeNow business 

const Service = require('../modals/Service');


// Creating the service 
const createService = async (req,res) => {
    try {
        const {service_name,service_code,category,est_price} = req.body;
        const newService = new Service({
            service_name,
            service_code,
            category,
            est_price
        });
        await newService.save();
        res.status(201).json(newService);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Getting the list of All the service 
const getService = async (req,res) => {
    try {
        const service = await Service.find();
        res.status(200).json(service);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Getting the Specific service by Id 
const getSpecificService = async (req,res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(service);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Updating the service by Id 
const updateService = async (req,res) => {
    try {
        const {service_name,service_code} = req.body;
        const service = Service.findByIdAndUpdate(req.params.id,{
            service_name,
            service_code
        },{new : true});
        res.status(200).json(service)
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}


// Deleting the service by Id 
const deleteService = async (req,res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

// Exporting all the Categories
module.exports = { 
    createService,
    getService,
    getSpecificService,
    updateService,
    deleteService
}