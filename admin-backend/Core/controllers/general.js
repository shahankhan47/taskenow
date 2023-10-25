const Job = require('../modals/Job');
const Technician = require('../modals/Technician')


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

module.exports = {
    getWidgetDetails
}