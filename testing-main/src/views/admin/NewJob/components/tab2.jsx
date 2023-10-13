import React from 'react';

const InstallerAddress = ({ values, handleChange }) => {
    console.log(values)
  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Address Line 1</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('addressLine1')}
            value={values.addressLine1}
          />
        </div>
        <div>
          <label className="block text-gray-700">Address Line 2</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('addressLine2')}
            value={values.addressLine2}
          />
        </div>
        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('city')}
            value={values.city}
          />
        </div>
        <div>
          <label className="block text-gray-700">State</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('state')}
            value={values.state}
          />
        </div>
        <div>
          <label className="block text-gray-700">Zip</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('zip')}
            value={values.zip}
          />
        </div>
      </form>
     
    </div>
  );
};

export default InstallerAddress;
