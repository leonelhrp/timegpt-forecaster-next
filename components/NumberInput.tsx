import React from 'react';

interface InputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

const NumberInput: React.FC<InputProps> = ({ value, onChange, placeholder }) => {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const increaseValue = () => {
    onChange(value + 1);
  };

  const decreaseValue = () => {
    onChange(value - 1);
  };

  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="number"
        placeholder={placeholder}
        className="mt-1 py-2 px-3 pl-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div className="absolute right-0 top-0 bottom-0 flex items-center space-x-1">
        <button onClick={decreaseValue} className="hover:bg-gray-200 p-1 rounded w-9 h-9">
          -
        </button>
        <button onClick={increaseValue} className="hover:bg-gray-200 p-1 rounded w-9 h-9 ">
          +
        </button>
      </div>
    </div>
  );
}

export default NumberInput;
