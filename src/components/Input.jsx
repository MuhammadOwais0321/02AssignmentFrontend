import React from "react";

const Input = ({ value, type, placeholder,handleInputValue }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={ handleInputValue}
        className="py-1 px-2.5 h-10 w-80 text-sm bg-white rounded-sm border  border-gray-700/60"
      />
    </>
  );
};

export default Input;
