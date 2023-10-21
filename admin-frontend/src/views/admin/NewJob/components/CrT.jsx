import React, { useState } from 'react';
import InstallerBasicDetails from './Customer';
import InstallerAddress from './Address';
import InstallerLicense from './Technician';
import InstallerPayment from './Job';
import { createJob, bookJob } from 'data/api';

const CreateTech = () => {
  const [step, setStep] = useState(1);
  const [showTech, setShowTech] = useState(false);

  // State to store installer details
  const [jobDetails, setJobDetails] = useState({
    taskNow_unique_id: '',
    sequence_number: 0,
    user_profile_completed: false,
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    phoneNumber: '',
    password: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zip: '',
    miles_distance: 0,
    profileImage: '',
    yearsOfExperience: 0,
    description: '',
    licenseNumber: '',
    licenseExpirationDate: '',
    licenseCertified: false,
    services: '',
    ratingsAndReviews: 3,
    dateOfBirth: '',
    jobStatus: 'Unassigned',
    jobType: 'Inspection',
    paymentStatus: "Pending"
  });

  const nextStep = () => {
    if (showTech === false && step === 1)
      setStep(step + 2)
    else
      setStep(step + 1);
  };

  const prevStep = () => {
    if (showTech === false && step === 3)
      setStep(step - 2)
    else
      setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    if (input === "jobStatus") {
      if (e.target.value !== "Unassigned")
        setShowTech(true);
      else if (e.target.value === "Unassigned")
        setShowTech(false);
    }
    setJobDetails({ ...jobDetails, [input]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = {
      job: {
        status: {
          technician: jobDetails.jobStatus,
          customer:  jobDetails.jobStatus,
          assigned: jobDetails.jobStatus
        },
        cost: jobDetails.cost,
        type: jobDetails.jobType,
        dateCreated: new Date(),
        dateModified: new Date(),
        description: jobDetails.description,
        service: jobDetails.services,
        time_start: jobDetails.time_start,
        time_end: jobDetails.time_end,
        dateOfJob: new Date(jobDetails.date)
      },
      technician: {
        distance: jobDetails.miles_distance,
        rating: jobDetails.ratingsAndReviews,
        email: jobDetails.technicianEmail,
        id: jobDetails.technicianId,
        firstName: jobDetails.technicianName,
        lastName: "",
        phone: jobDetails.technicianPhoneNumber,
        paymentStatus: {
          released: false,
          releaseDate: null,
          amount: 0
        }
      },
      customer: {
        addressLine1: jobDetails.addressLine1,
        addressLine2: jobDetails.addressLine2,
        city: jobDetails.city,
        email: jobDetails.customerEmail,
        phone: jobDetails.customerPhone,
        firstName: jobDetails.customerFirstName,
        lastName: jobDetails.customerLastName,
        paymentId: jobDetails.paymentId,
        paymentStatus: jobDetails.paymentStatus,
        state: jobDetails.state,
        zip: jobDetails.zip
      }
    }
    console.log(data);
    const job = await createJob(data);
    console.log(job);
    await bookJob({customer: data.customer, jobId: job.data._id});
    alert('Job created');
    // window.location.reload()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 w-96 overflow-y-scroll" style={{ maxHeight: '70vh'}}>
            <h2 className="text-2xl font-semibold">Job Details</h2>
            {/* Include your form fields for payment here */}
            <InstallerPayment handleChange={handleChange} values={jobDetails}/>
            <div className="flex space-x-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        );
        case 2:
          return (
            <div className="space-y-4 w-96 overflow-y-scroll" style={{ maxHeight: '70vh'}}>
              <h2 className="text-2xl font-semibold">Technician Details</h2>
              {/* Include your form fields for license here */}
              <InstallerLicense handleChange={handleChange} values={jobDetails}/>
              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          );
      case 3:
        return (
          <div className="space-y-4 w-96 overflow-y-scroll" style={{ maxHeight: '70vh'}}>
     
            <h2 className="text-2xl font-semibold">Basic Details</h2>
            {/* Include your form fields for basic details here */}
            <InstallerBasicDetails handleChange={handleChange} values={jobDetails}/>
            <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 w-96 overflow-y-scroll" style={{ maxHeight: '70vh'}}>
            <h2 className="text-2xl font-semibold">Address</h2>
            {/* Include your form fields for address here */}
            <InstallerAddress handleChange={handleChange} values={jobDetails}/>
            <div className="flex space-x-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-196 mx-auto my-1 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Job Details</h1>
      <div className="space-x-8 flex">
        {renderStep()}
        <div className="mt-4 w-64">
          <div className="bg-gray-200 p-2 rounded-lg">
            {/* Subtabs */}
            <ul className="space-y-4">
              <li
                className={`${
                  step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(1)}
              >
                Job Details
              </li>
              {showTech && <li
                className={`${
                  step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(2)}
              >
                Technician Details
              </li>}
              <li
                className={`${
                  step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(3)}
              >
                Basic Details
              </li>
              <li
                className={`${
                  step === 4 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(4)}
              >
                Address
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTech;
