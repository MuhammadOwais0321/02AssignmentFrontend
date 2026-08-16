import React from 'react';

const Button = ({value, type }) => {
  return (
    <>
      <button type={type}  className="py-3 hover:bg-blue-800  hover:text-shadow-gray-600 cursor-pointer font-bold font-sans  w-80 text-xl text-white bg-blue-500 rounded-sm border  border-gray-700/60">{value}</button>
    </>
  );
};

export default Button;