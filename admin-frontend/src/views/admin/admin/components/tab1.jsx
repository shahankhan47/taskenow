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
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('firstName')}
            value={values.firstName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('lastName')}
            value={values.lastName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('email')}
            value={values.email}
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('phoneNumber')}
            value={values.phoneNumber}
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
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
