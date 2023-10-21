import React from 'react';

const InstallerPayment = ({ values, handleChange, prevStep }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Admin Hierarchy</label>
          <select
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('heirarchy')}
            value={values.heirarchy}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full text-sm border rounded border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            rows="4"
            onChange={handleChange('description')}
            value={values.description}
          />
        </div>
      </form>
    </div>
  );
};

export default InstallerPayment;
