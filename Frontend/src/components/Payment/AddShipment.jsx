import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Input, Button } from "@material-tailwind/react";

export default function AddShipment({ onSubmit, onCancel, initialData, setUserData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ ...initialData });

  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setUserData({ ...formData, [name]: value });
  };

  const handleAddShipment = () => {
    onSubmit(formData);
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    onCancel();
  };

  function openModal() {
    setIsOpen(true);
  }

  return (
    <><div>
      <button
        className="rounded-lg px-3 py-2 bg-orange-500 text-white"
        type="button"
        onClick={openModal}
      >
        + Add new
      </button>
    </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Panel className="bg-white p-6 rounded-md shadow-xl">
                <Dialog.Title className="text-lg font-bold">Add Shipment</Dialog.Title>
                <div className="mt-4">
                  <Input
                    className="text-black w-full"
                    size="lg"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    name="fullName"
                  />
                  <Input
                    className="text-black w-full mt-4"
                    size="lg"
                    placeholder="Phone number"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    name="phoneNumber"
                  />
                  <Input
                    className="text-black w-full mt-4"
                    size="lg"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    name="address"
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={handleAddShipment}
                  >
                    Confirm
                  </Button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
