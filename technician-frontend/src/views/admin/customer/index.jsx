import React, { useState } from 'react';
import HistoryCard from './components/HistoryCard';
import CreateCustomer from './components/CrT';
import Banner1 from './components/Banner';

const User = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <div className="flex gap-x-4">
        <Banner1 />
       
      </div>
      <div className="flex">
        {/* Display the loader GIF continuously */}
        <CreateCustomer refresh={refresh} setRefresh={setRefresh} />
        <HistoryCard refresh={refresh} setRefresh={setRefresh} />
        {/* CreateTech component */}
      </div>
    </>
  );
};

export default User;
