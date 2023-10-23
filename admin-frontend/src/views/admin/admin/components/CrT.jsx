import React, { useState } from 'react';
import InstallerBasicDetails from './tab1';
import InstallerAddress from './tab2';
import InstallerLicense from './tab3';
import InstallerPayment from './tab4';
import { createAdmin, getSpecificAdminData } from 'data/api';
import { adminVerificationAddOrUpdate } from 'data/verification';
import { getCookie } from 'data/cookie';

const blankState = {
  _id: null,
  taskNow_unique_id: '',
  sequence_number: 0,
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
  description: '',
  access:[]
}

const setAdmin = async (installerDetails, setInstallerDetails, adminVerified, setRefresh) => {
  if (adminVerified === "OK") {
    await createAdmin(installerDetails);
    setRefresh(true);
    setInstallerDetails(blankState)
  }
  else {
    alert(adminVerified);
  }
}

const CreateTech = ({refresh, setRefresh}) => {
  const [step, setStep] = useState(1);

  // State to store installer details
  const [installerDetails, setInstallerDetails] = useState(blankState);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => async (e) => {
    console.log(input)
    if (input.Admin) {
      let temp = {...installerDetails}
      if (input.Admin[Object.keys(input.Admin)[0]] === true) {
        temp.access.push(Object.keys(input.Admin)[0]);
      }
      else {
        const removedAccess = temp.access.filter(elem => elem !== Object.keys(input.Admin)[0])
        temp.access = removedAccess;
      }
      setInstallerDetails(temp);
    }
    else {
      setInstallerDetails({ ...installerDetails, [input]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const adminVerified = await adminVerificationAddOrUpdate(installerDetails, "add");
    const adminId = getCookie("id");
    if (adminId === "superadmin") {
      setAdmin(installerDetails, setInstallerDetails, adminVerified, setRefresh)
    }
    else {
      const currentAdmin = (await getSpecificAdminData(adminId)).data;
      if (Number(currentAdmin.heirarchy) <= Number(installerDetails.heirarchy)) {
        setAdmin(installerDetails, setInstallerDetails, adminVerified, setRefresh)
      }
      else {
        alert("Not allowed. You are trying to create admin of upper hierarchy.")
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 w-[70%]">
     
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
          <div className="space-y-4 w-[70%] rounded-lg ">
            <h2 className="text-2xl font-semibold">Access</h2>
            {/* Include your form fields for license here */}
            <InstallerLicense handleChange={handleChange} values={installerDetails.access}/>
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
    <div className="w-[71.5%]  my-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Admin Details</h1>
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
                Autorization
              </li>
              <li
                className={`${
                  step === 4 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } px-4 py-2 rounded cursor-pointer`}
                onClick={() => setStep(4)}
              >
                Others
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTech;
