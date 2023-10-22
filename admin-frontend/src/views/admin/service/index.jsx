import { useState ,useEffect } from "react";
import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png"; // KEEP THIS IMPORT
import NFt4 from "assets/img/nfts/Nft4.png"; // KEEP THIS IMPORT
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png"; // KEEP THIS IMPORT
import NFt6 from "assets/img/nfts/Nft6.png"; // KEEP THIS IMPORT
import avatar1 from "assets/img/avatars/avatar1.png"; // Will Replace this With the Avator for the Categories
import avatar2 from "assets/img/avatars/avatar2.png"; // Will Replace this With the Avator for the Categories
import avatar3 from "assets/img/avatars/avatar3.png"; // Will Replace this With the Avator for the Categories



import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

// Components Used in the Applicaiton
import NftCard from "components/card/NftCard";
import ServiceProfile from "./components/HistoryCard";
import ServiceCreate from "./components/TableTopCreators";

// Data Import 
import { getserviceList, deleteServiceById } from "data/api";


// Base Component of this file
const Customer = () => {
  const [service,setServce] = useState([]);
  const [selectedNft, setSelectedNft] = useState({
    id: "",
    image: null,
    serviceName: " ",
    serviceCode: " ",
    servicePrice: 0.0,
    category: " "
  }); // For Selected Service preview
  const serviceListImage = [NFt2, NFt4, NFt3, NFt5, NFt6]; // Images for Service Listing
  
  // UseEffect
  useEffect(() => {
    // Call API to fetch service list
    getserviceList().then(response => {
      setServce(response.data);
    })
  },[]);

  // Callback function to update selectedNft
  const handleNftCardClick = (data) => {
      const selectedHistoryData = {
        id: data._id,
        image: data.image,
        serviceName: data.service_name,
        serviceCode: data.service_code,
        servicePrice: data.est_price,
        category: data.category, 
      }
      setSelectedNft(selectedHistoryData);
  };

  const handleNftCardDelete = async (data) => {
    await deleteServiceById(data._id)
    getserviceList().then(response => {
      setServce(response.data);
      setSelectedNft({
        id: "",
        image: null,
        serviceName: " ",
        serviceCode: " ",
        servicePrice: 0.0,
        category: " "
      })
    })
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        {/* This will Have the Dynamic Data as per the service */}
        <Banner />

        {/*  Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Services List
          </h4>
        
        </div>

        {/* Service card */}
        <div className="z-20 grid grid-cols-1 p-4 gap-5 md:grid-cols-3" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          {service.map((service, index) => (
            <NftCard
              key={index}
              bidders={service.bidders}
              title={service.service_name}
              author={service.service_code}
              price={service.est_price}
              id={service.taskNow_unique_id}
              image={serviceListImage[Math.floor(Math.random() * serviceListImage.length)]}
              onCardClick={() => handleNftCardClick(service)}
              onCardDelete={() => handleNftCardDelete(service)}
            />
          ))}
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-[24vw] right-10 rounded-xl 2xl:col-span-1 fixed">
        <ServiceCreate data={selectedNft} renderServices={setServce} />
        <ServiceProfile data={selectedNft} renderServices={setServce} />
      </div>
    </div>
  );
};

export default Customer;
