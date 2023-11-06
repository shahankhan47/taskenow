import React, {useState, useEffect} from "react";
import AssignTechnicianModel from './assignTechnician';
import { updateJob } from "data/api";


const JobDetailsModal = ({ isOpen, onClose, job, isDarkMode, deleteJob }) => {
    const [showTech, setShowTech] = useState(false);
    const [currentJob, setCurrentJob] = useState({})
    
    useEffect(() => {
        setCurrentJob(job)
    }, [job])

    if (!isOpen) return null;

    const assignTechnician = () => {
        setShowTech(true);
    };

    const unAssignTechnician = async () => {
        const originalJob = {...job.originalJob}
        const JobId = originalJob.taskNow_unique_id;
        originalJob.job.status = {
            assigned: "Unassigned",
            customer: "Unassigned",
            technician: "Unassigned"
        }
        originalJob.job.dateModified = new Date();
        originalJob.technician = {
            distance: 0,
            email: "",
            firstName: "", 
            id: "",
            lastName: "",
            paymentStatus: job.originalJob.technician.paymentStatus,
            phone: "",
            rating: 3,
        }
        await updateJob({JobId, updateData: originalJob})
        onClose()
        window.location.reload()
    }

    return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? "dark" : ""}`}>
    <div
        className={`fixed inset-0 ${
        isDarkMode ? "bg-black" : "bg-gray-200"
        } opacity-60`}
        onClick={onClose}
    ></div>
    <div className="fixed inset-0 flex items-center justify-center">
        <div
        className={`bg-white dark:bg-gray-800 w-[900px] p-8 rounded-lg`}
        >
        <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Job Details */}
            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
            <h2
                className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-black"
                }`}
            >
                Job Details
            </h2>
            <div className="grid grid-cols-2 gap-2">
                <p
                className={`mb-1 col-span-1 font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                Job ID:
                </p>
                <p
                className={`mb-1 col-span-1 ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                {currentJob.jobId}
                </p>
                <p
                className={`mb-1 col-span-1 font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                Customer Name:
                </p>
                <p
                className={`mb-1 col-span-1 ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                {currentJob.customerName}
                </p>
                <p
                className={`mb-1 col-span-1 font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                Customer Address:
                </p>
                <p
                className={`mb-1 col-span-1 ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                {currentJob.customerAddress}
                </p>
                <p
                className={`mb-1 col-span-1 font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                Customer Phone:
                </p>
                <p
                className={`mb-1 col-span-1 ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                {currentJob.customerPhoneNumber}
                </p>
                <p
                className={`mb-1 col-span-1 font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                Customer Email:
                </p>
                <p
                className={`mb-1 col-span-1 ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                {currentJob.customerEmail}
                </p>
                <p
                className={`mb-1 col-span-1 font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                Price
                </p>
                <p
                className={`mb-1 col-span-1 ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                {currentJob.cost}
                </p>
                <p
                className={`mb-1 col-span-1 font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                Job Details:
                </p>
                <p
                className={`mb-1 col-span-1 ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
                >
                {currentJob.jobDetails}
                </p>

            </div>
            </div>

            {/* Right Column: List of Technicians */}
            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
            <h2
                className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-black"
                }`}
            >
                Technician Status
            </h2>
            {currentJob.technicianAssigned ? (
                <>
                <div className="grid grid-cols-2 gap-2">
                    <p
                    className={`mb-2 col-span-1 font-bold ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                    >
                    Technician Assigned:
                    </p>
                    <p
                    className={`mb-2 col-span-1 ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                    >
                    {currentJob.technicianName}
                    </p>
                    <p
                    className={`mb-2 col-span-1 font-bold ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                    >
                    Technician Id:
                    </p>
                    <p
                    className={`mb-2 col-span-1 ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                    >
                    {currentJob.technicianId}
                    </p>
                </div>
                {currentJob.status !== "Completed" && <button
                    onClick={unAssignTechnician}
                    className={`mt-4 ${
                    isDarkMode ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-500 hover:bg-orange-600"
                    } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300`}
                >
                    Unassign Tehnician
                </button>}
                <div>
                    <button
                        onClick={onClose}
                        className={`mt-4 ${
                        isDarkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"
                        } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-300`}
                    >
                        Close
                    </button>
                    <button
                        onClick={deleteJob}
                        className={`mt-4 ml-5 ${
                        isDarkMode ? "bg-red-800 hover:bg-red-600" : "bg-red-500 hover:bg-red-400"
                        } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-300`}
                    >
                        Delete
                    </button>
                </div>
                </>
            ) : (
                <>
                <p
                    className={`mb-2 ${
                    isDarkMode ? "text-white" : "text-black"
                    }`}
                >
                    No Technician Assigned
                </p>
                {currentJob.status !== "Completed" && <button
                    onClick={assignTechnician}
                    className={`mt-4 ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300`}
                >
                    Assign Technician
                </button>}
                <div>
                    <button
                        onClick={onClose}
                        className={`mt-4 ml-0 ${
                        isDarkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"
                        } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-300`}
                    >
                        Close
                    </button>
                    <button
                        onClick={deleteJob}
                        className={`mt-4 ml-5 ${
                        isDarkMode ? "bg-red-800 hover:bg-red-600" : "bg-red-500 hover:bg-red-400"
                        } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-300`}
                    >
                        Delete
                    </button>
                </div>
                </>
            )}
            </div>
        </div>
        </div>
    </div>
    {showTech && 
    <AssignTechnicianModel 
    isDarkMode={isDarkMode} 
    onClose={setShowTech} 
    isOpen={showTech} 
    job={job}
    setJob={setCurrentJob}
    />}
    </div>
    );
};

export default JobDetailsModal;