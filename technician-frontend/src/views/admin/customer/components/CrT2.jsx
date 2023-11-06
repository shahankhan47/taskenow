import React, { useState } from 'react';
import CustomerBasicDetails from './tab1';
import CustomerAddress from './tab2';
import UserPayment from './tab3';
import { updateUser, deleteUser } from 'data/api';
import { userVerificationAddOrUpdate } from 'data/verification';

const CreateCustomer = ({initialValues, onCancel}) => {
  const [step, setStep] = useState(1);

  // State to store installer details
  const [installerDetails, setInstallerDetails] = useState({
    _id:initialValues._id,
    taskNow_unique_id: initialValues.taskNow_unique_id,
    sequence_number: initialValues.sequence_number,
    user_profile_completed: false,
    firstName: initialValues.firstName,
    lastName: initialValues.lastName,
    email: initialValues.email,
    state: initialValues.state,
    phoneNumber: initialValues.phoneNumber,
    password: initialValues.password,
    addressLine1: initialValues.addressLine1,
    addressLine2: initialValues.addressLine2,
    city: initialValues.city,
    zip: initialValues.zip,
    miles_distance: initialValues.miles_distance,
    profileImage: '',
    yearsOfExperience: initialValues.yearsOfExperience,
    description: initialValues.description,
    licenseNumber: initialValues.licenseNumber,
    licenseExpirationDate: initialValues.licenseExpirationDate,
    licenseCertified: initialValues.licenseCertified,
    services: [],
    ratingsAndReviews: 3,
    dateOfBirth: initialValues.dateOfBirth,
    AccountNumber: initialValues.AccountNumber,
    routingNumber: initialValues.routingNumber,
    ssn: initialValues.ssn
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
    const userVerified = await userVerificationAddOrUpdate(installerDetails);
    if (userVerified === "OK") {
      await updateUser(installerDetails._id,installerDetails)
      onCancel()
    }
    else {
      alert(userVerified)
    }
  }

  const handleDeleteUser = async () => {
    await deleteUser(installerDetails._id)
    onCancel()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
     
            <h2 className="text-2xl font-semibold">Basic Details</h2>
            {/* Include your form fields for basic details here */}
            <CustomerBasicDetails handleChange={handleChange} values={installerDetails}/>
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
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Address</h2>
            {/* Include your form fields for address here */}
            <CustomerAddress handleChange={handleChange} values={installerDetails}/>
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
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Payment</h2>
            {/* Include your form fields for payment here */}
            <UserPayment handleChange={handleChange} values={installerDetails}/>
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
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        );
      default:
      return null;
    }
  };


  return (
    <div className="w-full mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Customer Details</h1>
      <div className="space-y-8">
        {renderStep()}
        <div className="mt-4">
          <div className="bg-gray-200 p-2 rounded-lg">
            {/* Subtabs */}
            <ul className="flex space-x-4">
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
                Payment
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
