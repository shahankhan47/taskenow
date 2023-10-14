import React from 'react';

const InstallerPayment = ({ values, handleChange, prevStep }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Admin Hierarchy</label>
          <select
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('adminHierarchy')}
            value={values.adminHierarchy}
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
            className="border rounded px-3 py-2 w-full"
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
