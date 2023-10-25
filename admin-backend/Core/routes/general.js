const express = require('express');
const router = express.Router();


// Import of the Technician Controller
const general = require("../controllers/general");


// Creating the Technician
router.get("/widgets", async (req, res) => {
    try {
        const response = await general.getWidgetDetails()
        res.status(200).json(response)
    }
    catch(error) {
        res.status(400).json({error:error.message});
    }
});

module.exports = router;