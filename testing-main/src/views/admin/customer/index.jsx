import Banner from "./components/Banner";

const Customer = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">


        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Placeholder for Recently Added NFTs */}
          <div className="bg-gray-200 p-4 rounded-lg">
            {/* Content: This Section is under progress, this will be done on business end approval */}
            <p className="text-red-500 text-center font-bold">
              This Section is under progress, this will be done on business end
              approval
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
