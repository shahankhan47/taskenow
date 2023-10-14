const express = require("express");

const app = express();

// CORE FUNCITONS LOGIC STANDS HERE

// Makeing the Routes
const serviceRoutes = require('./Service');
const technicianRoutes = require('./Technician');
const adminRouters = require('./Admin');
const jobRoutes = require('./Job');
const categoryRoutes = require('./Category');

// Using the Routes
app.use('/service', serviceRoutes);
app.use('/technician',technicianRoutes);
app.use('/admin',adminRouters);
app.use('/job',jobRoutes);
app.use('/category', categoryRoutes);






// BUSINESS LOGIC







module.exports = app;
