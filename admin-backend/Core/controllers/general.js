const Job = require('../modals/Job');
const Technician = require('../modals/Technician')
const ObjectId = require('mongoose').Types.ObjectId;


async function getWidgetDetails() {
    try {
        const totalJobs = await Job.find({}).count().exec();
        const inspectionJobs = await Job.find({"job.type": "Inspection"}).count().exec();
        const repairingJobs = await Job.find({"job.type": "Repairing"}).count().exec();
        const totalTechnicians = await Technician.find({}).count().exec();
        const completedJobs = await Job.find({"job.status.customer": "Completed", "job.status.technician": "Completed"}).exec();
        const jobsDone = completedJobs.length;
        const balance = completedJobs.reduce((prev, next) => {return prev + next.job?.cost}, 0)

        const thisMonthCompletedJobs = completedJobs.filter((job) => {
            const thisMonth = new Date().getMonth() + 1;
            const jobMonth = job.job.dateModified.getMonth() + 1;
            if (jobMonth === thisMonth)
            return job;
        })

        const lastMonthCompletedJobs = completedJobs.filter((job) => {
            const lastMonth = new Date().getMonth();
            const jobMonth = job.job.dateModified.getMonth() + 1;
            if (jobMonth === lastMonth)
            return job;
        })

        const thisMonthRevenue = thisMonthCompletedJobs.reduce((prev, next) => {return prev + next.job?.cost}, 0)
        const lastMonthRevenue = lastMonthCompletedJobs.reduce((prev, next) => {return prev + next.job?.cost}, 0)
        const percentGrowthFromLastMonth = ((thisMonthRevenue - lastMonthRevenue) * 100) / lastMonthRevenue;

        return {
            totalJobs,
            inspectionJobs,
            repairingJobs,
            totalTechnicians,
            jobsDone,
            balance,
            thisMonthRevenue,
            thisMonthJobs: thisMonthCompletedJobs.length,
            growthPercent: Math.floor(percentGrowthFromLastMonth)
        }
    }
    catch(error) {
        return {message: error}
    }
}

async function getTechnicianWidgetDetails(id) {
    try {
        const technician = await Technician.findOne({$or: [{_id: new ObjectId(id)}, {taskNow_unique_id: id}]}).exec();
        const jobs = await Job.find({"technician.id": technician?.taskNow_unique_id}).exec();
        const completedJobs = await Job.find({"job.status.customer": "Completed", "job.status.technician": "Completed", "technician.id": technician?.taskNow_unique_id}).exec();

        const totalJobs = jobs.length;
        const inspectionJobs = jobs.reduce((prev, next) => {if (next.job.type === "Inspection" && next.job.status.technician === "Accepted") {return prev + 1} else {return prev + 0}}, 0);
        const repairingJobs = jobs.reduce((prev, next) => {if (next.job.type === "Repairing" && next.job.status.technician === "Accepted") {return prev + 1} else {return prev + 0}}, 0);
        const jobsDone = completedJobs.length;
        const pendingJobs = jobs.reduce((prev, next) => {if (next.job.status.technician === "Pending") {return prev + 1} else {return prev + 0}}, 0);
        const balance = completedJobs.reduce((prev, next) => {return prev + next.job?.cost}, 0);

        const thisMonthCompletedJobs = completedJobs.filter((job) => {
            const thisMonth = new Date().getMonth() + 1;
            const jobMonth = job.job.dateModified.getMonth() + 1;
            if (jobMonth === thisMonth)
            return job;
        })

        const lastMonthCompletedJobs = completedJobs.filter((job) => {
            const lastMonth = new Date().getMonth();
            const jobMonth = job.job.dateModified.getMonth() + 1;
            if (jobMonth === lastMonth)
            return job;
        })

        const thisMonthRevenue = thisMonthCompletedJobs.reduce((prev, next) => {return prev + next.job?.cost}, 0)
        const lastMonthRevenue = lastMonthCompletedJobs.reduce((prev, next) => {return prev + next.job?.cost}, 0)
        const percentGrowthFromLastMonth = ((thisMonthRevenue - lastMonthRevenue) * 100) / lastMonthRevenue;

        return {
            totalJobs,
            inspectionJobs,
            repairingJobs,
            jobsDone,
            pendingJobs,
            balance,
            thisMonthRevenue,
            thisMonthJobs: thisMonthCompletedJobs.length,
            growthPercent: Math.floor(percentGrowthFromLastMonth)
        }
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getWidgetDetails,
    getTechnicianWidgetDetails
}