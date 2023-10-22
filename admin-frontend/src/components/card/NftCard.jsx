import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";

const NftCard = ({ title, author, price, image, extra , onCardClick, onCardDelete, id }) => {

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
         
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {id}{" "}
            </p>
          </div>

         
        </div>

        <div className="bottom-0 flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
         <p>
          <button
            href=""
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={() => onCardClick({ title, author, price, image })}
          >
            View
          </button>
          <button
            href=""
            className=" ml-2 linear rounded-[20px] bg-red-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-400 active:bg-red-300 dark:bg-red-400 dark:hover:bg-red-300 dark:active:opacity-90"
            onClick={() => onCardDelete({ title, author, price, image, id })}
          >
            Delete
          </button>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
