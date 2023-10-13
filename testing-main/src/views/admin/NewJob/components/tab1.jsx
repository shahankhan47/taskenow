import React from 'react';

const InstallerBasicDetails = ({ values, handleChange }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Customer First Name</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('customerFirstName')}
            value={values.customerFirstName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Last Name</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('customerLastName')}
            value={values.customerLastName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Email Address</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('customerEmail')}
            value={values.customerEmail}
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('date')}
            value={values.date}
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('time_start')}
            value={values.time_start}
          />
        </div>
        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('time_end')}
            value={values.time_end}
          />
        </div>
      </form>
    </div>
  );
};

export default InstallerBasicDetails;
