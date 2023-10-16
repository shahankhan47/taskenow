import React from 'react';
import HistoryCard from './components/HistoryCard';
import CreateCustomer from './components/CrT';
import Banner1 from './components/Banner';

const User = () => {
  return (
    <>
      <div className="flex gap-x-4">
        <Banner1 />
       
      </div>
      <div className="flex">
        {/* Display the loader GIF continuously */}
        <CreateCustomer />
        <HistoryCard />
        {/* CreateTech component */}
      </div>
    </>
  );
};

export default User;
