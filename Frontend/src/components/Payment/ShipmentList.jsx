import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShipment,
  selectShipments,
} from "../../redux/slices/shipmentSlice";
import { Dialog, Transition } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import UpdateShipment from "./UpdateShipment";
import AddShipment from "./AddShipment";
import { addUserShipmentDetail } from "../../services/shipmentService";

export default function ShipmentList() {
  const dispatch = useDispatch();
  const shipments = useSelector(selectShipment);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  
  const handleSaveClick = async (data) => {
    try {
      const response = await addUserShipmentDetail(token, data);

      if (response.status === 200) {
        alert("Shipment details saved successfully.");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error saving shipment details:", error);
    }
  };

  const handleCancel = () => {
  };

  const handleSelectShipment = (shipment) => {
    dispatch(selectShipments(shipment));
    setSelectedShipment(shipment);
    setIsOpen(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="mb-4">
        <button
          type="button"
          onClick={openModal}
          className="border-r-2 pr-4 text-orange-500"
        >
          Address archives
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white p-6 rounded-md shadow-xl w-fit mx-4">
                  {shipments.length === 0 ? (
                    <p className="text-center text-gray-700">
                      Your address book is empty
                    </p>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <h2 className="font-bold text-xl text-gray-900">
                          My Address
                        </h2>
                      </div>
                      {shipments.map((shipment) => (
                        <div
                          className="p-4 border-b last:border-b-0 flex justify-between items-center"
                          key={shipment.id}
                        >
                          <input
                            type="radio"
                            name="selectedShipment"
                            onChange={() => handleSelectShipment(shipment)}
                            checked={selectedShipment?.id === shipment.id}
                            className=""
                          />
                          <div className=" w-3/5">
                            <div className="flex items-center">
                              <label className="pr-2 font-medium text-gray-800">
                                {shipment.fullName}
                              </label>
                              <p className="border-l-2 pl-2 text-gray-600">
                                {shipment.phoneNumber}
                              </p>
                            </div>
                            <p className="text-gray-600">{shipment.address}</p>
                          </div>
                          <UpdateShipment shipment={shipment} />
                        </div>
                      ))}
                      <AddShipment
                        onSubmit={handleSaveClick}
                        onCancel={handleCancel}
                        // initialData={userData}
                        // setUserData={setUserData}
                      />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
