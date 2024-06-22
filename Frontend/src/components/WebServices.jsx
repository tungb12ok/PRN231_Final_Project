import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faThumbsUp, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const WebServices = () => {
  return (
    <div className="flex flex-col items-center px-20 pb-32">
      <div className=" bg-zinc-700 text-white items-center  w-full flex justify-around pb-20 pt-5 relative">
        <h2 className="font-rubikmonoone text-4xl pl-4 border-l-4 border-orange-500">WE ARE <br/>DIFFERENT</h2>
        <p className="font-poppins">Discover our qualities that <br/>makes us different than other marketplace.</p>
        <p className=" hover:text-orange-500 text-white transition">
          More About Us
        </p>
      </div>
      <div className="flex w-3/4 justify-around bg-white border-zinc-600 border-2 absolute mt-32 py-5 drop-shadow-lg">
        <div className="text-center">
          <FontAwesomeIcon icon={faTruck} className="text-4xl text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold">Shipping NATIONWIDE</h3>
          <p className="mt-2 text-gray-400">Payment on delivery</p>
        </div>
        <div className="text-center">
          <FontAwesomeIcon icon={faThumbsUp} className="text-4xl text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold">Quality</h3>
          <p className="mt-2 text-gray-400">Product quality guaranteed</p>
        </div>
        <div className="text-center">
          <FontAwesomeIcon icon={faCreditCard} className="text-4xl text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold">Proceed to PAYMENT</h3>
          <p className="mt-2 text-gray-400">With many METHODS</p>
        </div>
      </div>
    </div>
  );
};

export default WebServices;
