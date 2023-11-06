import React from 'react';

const InstallerBasicDetails = ({ values, handleChange }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Customer First Name</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('customerFirstName')}
            value={values.customerFirstName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Last Name</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('customerLastName')}
            value={values.customerLastName}
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Email Address</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('customerEmail')}
            value={values.customerEmail}
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Phone Number</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('customerPhone')}
            value={values.customerPhone}
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('date')}
            value={values.date}
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('time_start')}
            value={values.time_start}
          />
        </div>
        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('time_end')}
            value={values.time_end}
          />
        </div>
      </form>
    </div>
  );
};

export default InstallerBasicDetails;
