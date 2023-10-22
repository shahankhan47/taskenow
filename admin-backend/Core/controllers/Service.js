// service for the TaskeNow business 
const mongodb = require('mongodb');
const Service = require('../modals/Service');


// Creating the service 
const createService = async (req,res) => {
    try {
        const {service_name,category,est_price} = req.body;
        const lastId = await findMostRecentService();

        const newService = new Service({
            taskNow_unique_id: `taske-service-${lastId+1}`,
            sequence_number: lastId+1,
            service_name,
            service_code: new mongodb.ObjectId(),
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
const updateService = async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
  
      // Find the technician by ID and update their data
      const updatedService = await Service.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // To return the updated document
      );
  
      if (!updatedService) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      // Return the updated technician data
      res.status(200).json(updatedService);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


// Deleting the service by Id 
const deleteService = async (req,res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({id: req.params.id, message: "Deleted"});
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
}

const findMostRecentService = async (req, res) => {
    try {
      // Find the most recent admin based on the createdAt field in descending order
      const mostRecentService = await Service.findOne().sort({ sequence_number: -1 });
      if(mostRecentService===null){
        return 0;
      }
      return mostRecentService.sequence_number;
    } catch (error) {
       return null;
    }
};

// Exporting all the Categories
module.exports = { 
    createService,
    getService,
    getSpecificService,
    updateService,
    deleteService
}