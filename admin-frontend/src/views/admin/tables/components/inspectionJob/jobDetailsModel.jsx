import React from "react";


const JobDetailsModal = ({ isOpen, onClose, job, isDarkMode }) => {
    if (!isOpen) return null;

    const assignTechnician = () => {
    // Add your logic to assign a technician to the job here
    // After assigning, you can update the job and close the modal
    onClose();
    };

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
                {job.jobId}
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
                {job.customerName}
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
                {job.customerAddress}
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
                {job.customerPhoneNumber}
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
                {job.customerEmail}
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
                {job.cost}
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
                {job.jobDetails}
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
            {job.technicianAssigned ? (
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
                    {job.technicianName}
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
                    {job.technicianId}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className={`mt-4 ${
                    isDarkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"
                    } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-300`}
                >
                    Close
                </button>
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
                <button
                    onClick={assignTechnician}
                    className={`mt-4 ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300`}
                >
                    Assign Technician
                </button>
                <button
                    onClick={onClose}
                    className={`mt-4 ml-4 ${
                    isDarkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"
                    } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-300`}
                >
                    Close
                </button>
                </>
            )}
            </div>
        </div>
        </div>
    </div>
    </div>
    );
};

export default JobDetailsModal;