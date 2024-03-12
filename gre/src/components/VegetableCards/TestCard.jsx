import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';

const TestCard = ({ name, color }) => {
  return (
    <div className={`w-72 h-72 rounded-lg p-6 flex flex-col justify-between text-white ${color} shadow-lg mx-4 mb-8 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:translate-y-[-5px] hover:shadow-xl`}>
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="flex items-center mt-2">
          <span className="bg-black text-white px-2 py-1 rounded-md text-xs">Graded by AI</span>
        </div>
      </div>
      <div className="text-center flex justify-end items-center">
        <Image src="/i2.gif" width={200} height={200} />
      </div>
    </div>
  );
};

export default TestCard;
