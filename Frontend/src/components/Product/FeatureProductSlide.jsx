import React, { useState } from 'react';

const FeatureProductSlide = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === products.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? products.length - 1 : currentSlide - 1);
  };

  return (
    <div className="relative">
      <div className="bg-white">
        <img src={products[currentSlide].mainImagePath} alt={products[currentSlide].mainImageName} className="w-full h-48 object-cover mb-4" />
        <h2 className="text-xl font-semibold mb-2">{products[currentSlide].productName}</h2>
        <p className="text-gray-700 mb-2">Brand: {products[currentSlide].brandName}</p>
        <p className="text-gray-700 mb-2">Price: {products[currentSlide].price} VND</p>
      </div>

      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-900 bg-opacity-75 text-white py-2 px-4" onClick={prevSlide}>
        Prev
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-900 bg-opacity-75 text-white py-2 px-4" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default FeatureProductSlide;
