import React from 'react';
import Banner1 from './Banner';

const InstallerBasicDetails = ({ values, handleChange }) => {
  return (
    <div>
        
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('firstName')}
            value={values.firstName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('lastName')}
            value={values.lastName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('email')}
            value={values.email}
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('phoneNumber')}
            value={values.phoneNumber}
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('password')}
            value={values.password}
          />
        </div>
        {/* Add more form fields as needed */}
      </form>

    </div>
  );
};

export default InstallerBasicDetails;
