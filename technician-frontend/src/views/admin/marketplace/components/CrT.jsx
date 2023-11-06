import React, { useState } from 'react';
import InstallerBasicDetails from './tab1';
import InstallerAddress from './tab2';
import InstallerLicense from './tab3';
import InstallerPayment from './tab4';
import { createTechnician } from 'data/api';
import { technicianVerificationAddOrUpdate } from 'data/verification';

const CreateTech = ({refresh, setRefresh}) => {
  const [step, setStep] = useState(1);

  // State to store installer details
  const [installerDetails, setInstallerDetails] = useState({
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
    services: [],
    ratingsAndReviews: 3,
    dateOfBirth: '',
    AccountNumber: null,
    routingNumber: null,
    ssn: null
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setInstallerDetails({ ...installerDetails, [input]: e.target.value });
  };

  const handleSubmit = async () => {
    const technicianVerified = await technicianVerificationAddOrUpdate(installerDetails)
    if (technicianVerified === "OK") {
      await createTechnician(installerDetails)
      setRefresh(true);
      setInstallerDetails({
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
        services: [],
        ratingsAndReviews: 3,
        dateOfBirth: '',
        AccountNumber: null,
        routingNumber: null,
        ssn: null
      })
    }
    else {
      alert(technicianVerified);
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4  w-[70%]">
     
            <h2 className="text-2xl font-semibold">Basic Details</h2>
            {/* Include your form fields for basic details here */}
            <InstallerBasicDetails handleChange={handleChange} values={installerDetails}/>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 w-[70%]">
            <h2 className="text-2xl font-semibold">Address</h2>
            {/* Include your form fields for address here */}
            <InstallerAddress handleChange={handleChange} values={installerDetails}/>
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
          <div className="space-y-4 w-[70%]">
            <h2 className="text-2xl font-semibold">License</h2>
            {/* Include your form fields for license here */}
            <InstallerLicense handleChange={handleChange} values={installerDetails}/>
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
          <div className="space-y-4 w-[70%]">
            <h2 className="text-2xl font-semibold">Payment</h2>
            {/* Include your form fields for payment here */}
            <InstallerPayment handleChange={handleChange} values={installerDetails}/>
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
    <div className="w-[71.5%]  my-8 my-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Service Provider Details</h1>
      <div className="space-y-8 flex gap-x-20">
        {renderStep()}
        <div className="mt-4">
          <div className="bg-gray-200 p-2 rounded-lg">
            {/* Subtabs */}
            <ul className="space-y-4">
              <li
                className={`${
                  step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(1)}
              >
                Basic Details
              </li>
              <li
                className={`${
                  step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(2)}
              >
                Address
              </li>
              <li
                className={`${
                  step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(3)}
              >
                License
              </li>
              <li
                className={`${
                  step === 4 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(4)}
              >
                Payment
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTech;
