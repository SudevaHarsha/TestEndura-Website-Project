// pages/index.js
import React from 'react';
import TestCard from './TestCard';
import { FaApple, FaCarrot, FaPepperHot, FaMushroom, FaLeaf, FaEggplant } from 'react-icons/fa'; // Import vegetable icons

const vegetables = [
  { name: 'Avocado', color: 'bg-green-200' },
  { name: 'Tomato', color: 'bg-red-500' },
  { name: 'Carrot', color: 'bg-orange-500' },
  { name: 'Paprika', color: 'bg-yellow-500' },
  { name: 'Mushroom', color: 'bg-brown-500' },
  { name: 'Green Pea', color: 'bg-green-400' },
  { name: 'Aubergine', color: 'bg-purple-500' },
  { name: 'Sweet Potato', color: 'bg-orange-600' },
  { name: 'Turnip', color: 'bg-purple-400' },
];




const VegetableCards = () => {
  return (
    <div className="container mx-auto py-8 grid grid-cols-3 gap-4">
      {vegetables.map((vegetable, index) => (
        <TestCard key={index} {...vegetable} index={index} />
      ))}
    </div>
  );
};

export default VegetableCards;
