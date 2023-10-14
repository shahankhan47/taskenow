import React from 'react';

const InstallerPayment = ({ values, handleChange, prevStep }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        {/* Add payment-related form fields here */}
        <div>
          <label className="block text-gray-700">Job Type</label>
          <select
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('jobType')}
            value={values.jobType}
          >
            <option value="Inspection">Inspection</option>
            <option value="Repairing">Repairing</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Payment Status</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('paymentStatus')}
            value={values.paymentStatus}
          />
        </div>
        <div>
          <label className="block text-gray-700">Payment Id</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('paymentId')}
            value={values.paymentId}
          />
        </div>
        <div>
          <label className="block text-gray-700">Cost</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('cost')}
            value={values.cost}
          />
        </div>
        <div>
          <label className="block text-gray-700">Job Status</label>
          <select
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange('jobStatus')}
            value={values.jobStatus}
          >
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
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
