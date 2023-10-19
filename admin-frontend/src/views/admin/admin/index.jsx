import React, { useState } from 'react';
import HistoryCard from './components/HistoryCard';
import CreateTech from './components/CrT';
import Banner1 from './components/Banner';

const Admin = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className="flex gap-x-4">
        <Banner1 />
       
      </div>
      <div className="flex">
        {/* Display the loader GIF continuously */}
        <CreateTech refresh={refresh} setRefresh={setRefresh} />
        <HistoryCard refresh={refresh} setRefresh={setRefresh} />
        {/* CreateTech component */}
       
      </div>
    </>
  );
};

export default Admin;
