

import HistoryCard from "./components/HistoryCard";
import CreateTech from "./components/CrT";
import Banner1 from "./components/Banner";

const Marketplace = () => {
  return (
    <>
      <div className="flex gap-x-4">
        <Banner1 />

      </div>
      <div className="flex">
        {/* Display the loader GIF continuously */}
        <CreateTech />
        <HistoryCard />
        {/* CreateTech component */}

      </div>
    </>
  );
};

export default Marketplace;
