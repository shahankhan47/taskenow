import React from 'react';

const InstallerLicense = ({ values, handleChange }) => {
  // Define the enum values
  const enumValues = ['technician', 'customer', 'general', 'payment', 'jobs', 'admin'];

  const handleCheckboxChange = (enumValue) => (event) => {
    const updatedValues = { ...values }; // Create a copy of the values object
    updatedValues[enumValue] = event.target.checked; // Update the value for the corresponding enumValue
    handleChange(updatedValues);
  };

  const getSelectedCheckboxes = () => {
    const selectedCheckboxes = enumValues.filter((enumValue) => values[enumValue]);
    return selectedCheckboxes;
  };

  return (
    <div>
      <form className="mt-4 space-y-4">
        {enumValues.map((enumValue) => (
          <div key={enumValue}>
            <label className="block text-gray-700">
              <input
                type="checkbox"
                onChange={handleCheckboxChange(enumValue)}
                checked={values[enumValue]}
              />{' '}
              {enumValue.charAt(0).toUpperCase() + enumValue.slice(1)} {/* Capitalize the enum value */}
            </label>
          </div>
        ))}
      </form>
      <div className="mt-4">
        <button onClick={() => console.log(getSelectedCheckboxes())}>Submit</button>
      </div>
    </div>
  );
};

export default InstallerLicense;
