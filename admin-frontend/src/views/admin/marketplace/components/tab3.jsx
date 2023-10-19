import React from 'react';

const InstallerLicense = ({ values, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">License</h2>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">License Number</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('licenseNumber')}
            value={values.licenseNumber}
          />
        </div>
        <div>
          <label className="block text-gray-700">License Expiration Date</label>
          <input
            type="date"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('licenseExpirationDate')}
            value={values.licenseExpirationDate}
          />
        </div>
        {/* Add more form fields as needed */}
      </form>
     
    </div>
  );
};

export default InstallerLicense;
