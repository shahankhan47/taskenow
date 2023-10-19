import React from 'react';

const CustomerAddress = ({ values, handleChange }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Address Line 1</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('addressLine1')}
            value={values.addressLine1}
          />
        </div>
        <div>
          <label className="block text-gray-700">Address Line 2</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('addressLine2')}
            value={values.addressLine2}
          />
        </div>
        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('city')}
            value={values.city}
          />
        </div>
        <div>
          <label className="block text-gray-700">State</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('state')}
            value={values.state}
          />
        </div>
        <div>
          <label className="block text-gray-700">Zip</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('zip')}
            value={values.zip}
          />
        </div>
      </form>
     
    </div>
  );
};

export default CustomerAddress;
