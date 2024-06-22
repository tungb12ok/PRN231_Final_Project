import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUserShipmentDetails } from "../../services/shipmentService";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShipment,
  selectShipments,
  setShipment,
} from "../../redux/slices/shipmentSlice";
import UpdateShipment from "../Payment/UpdateShipment";
import DeleteShipment from "../Payment/DeleteShipment";
import AddShipment from "../Payment/AddShipment";

const UserShipment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shipments = useSelector(selectShipment);

  useEffect(() => {
    const getShipment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const shipmentData = await getUserShipmentDetails(token);
          dispatch(setShipment(shipmentData.$values));
        }
      } catch (error) {
        console.error("Error fetching shipment:", error);
      }
    };

    getShipment();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-20 py-5">
      {shipments.length === 0 ? (
        <p>Your address book is empty</p>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-rubikmonoone text-2xl">My address</h2>
            <AddShipment/>
          </div>
          {shipments.map((shipment) => (
            <div
              className="p-4 border-b flex justify-between"
              key={shipment.id}
            >
              <div>
                <div className="flex">
                  <label className="pr-2">{shipment.fullName}</label>
                  <p className="border-l-2 pl-2">{shipment.phoneNumber}</p>
                </div>
                <p>{shipment.address}</p>
              </div>
              <div className="flex space-x-4">
                <UpdateShipment shipment={shipment} />
                <DeleteShipment id={shipment.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserShipment;
