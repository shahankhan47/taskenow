import React from 'react';

const InstallerLicense = ({ values, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">License</h2>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Technician Name</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('technicianName')}
            value={values.technicianName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Technician Email Address</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('technicianEmail')}
            value={values.technicianEmail}
          />
        </div>
        <div>
          <label className="block text-gray-700">Technician ID</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('technicianId')}
            value={values.technicianId}
          />
        </div>
        <div>
          <label className="block text-gray-700">Technician Phone Number</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('technicianPhoneNumber')}
            value={values.technicianPhoneNumber}
          />
        </div>
      </form>
    </div>
  );
};

export default InstallerLicense;
