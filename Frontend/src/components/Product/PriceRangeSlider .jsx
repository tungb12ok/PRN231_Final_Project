import { useState } from 'react';

const PriceRangeSlider = ({ min, max, onMinChange, onMaxChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setMinValue(value);
    onMinChange(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setMaxValue(value);
    onMaxChange(value);
  };

  return (
    <div className=" items-center justify-center mt-2 w-fit">
      <div className='flex'>
      <input
        type="range"
        min="0"
        max="2499999"
        value={minValue}
        onChange={handleMinChange}
        className="w-1/2"
      />
      <input
        type="range"
        min="2500000"
        max="5000000"
        value={maxValue}
        onChange={handleMaxChange}
        className="w-1/2"
      />
      </div>
      <div className="text-black font-bold">
        {minValue} - {maxValue}VND
      </div>
    </div>
  );
};

export default PriceRangeSlider;
