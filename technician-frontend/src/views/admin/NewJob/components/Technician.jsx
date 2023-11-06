import React from 'react';

const InstallerLicense = ({ values, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Technician Name</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('technicianName')}
            value={values.technicianName}
            placeholder='leave blank if unassigned'
          />
        </div>
        <div>
          <label className="block text-gray-700">Technician Email Address</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('technicianEmail')}
            value={values.technicianEmail}
            placeholder='leave blank if unassigned'
          />
        </div>
        <div>
          <label className="block text-gray-700">Technician ID</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('technicianId')}
            value={values.technicianId}
            placeholder='leave blank if unassigned'
          />
        </div>
        <div>
          <label className="block text-gray-700">Technician Phone Number</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('technicianPhoneNumber')}
            value={values.technicianPhoneNumber}
            placeholder='leave blank if unassigned'
          />
        </div>
      </form>
    </div>
  );
};

export default InstallerLicense;
