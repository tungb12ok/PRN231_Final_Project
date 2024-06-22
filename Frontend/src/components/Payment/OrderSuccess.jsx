// OrderSuccess.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const OrderSuccess = ({ orderCode }) => {
  const navigate = useNavigate();

  return (
    <div className="px-5 py-5 flex flex-row bg-slate-200">
      <div className="whitespace-nowrap w-1/2 bg-white mx-2 pr-14 flex items-center justify-center basis-1/2">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 text-8xl"
          />
          <div className="font-bold text-2xl pt-5">Order Success</div>
          <div>
            Order Code <span className="font-bold text-xl">{orderCode}</span>
          </div>
          <div className="text-lg">Thank you for your purchase!</div>
          <div
            className="text-blue-500 font-bold pt-5 text-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="inline-block text-2xl">
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className="inline-block ml-1 pl-3">Continue Shopping</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
