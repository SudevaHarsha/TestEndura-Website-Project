"use client"
// pages/index.js
import React, { useEffect, useState } from 'react';
import TestCard from './TestCard';
import axios from "axios";
import { FaApple, FaCarrot, FaPepperHot, FaMushroom, FaLeaf, FaEggplant } from 'react-icons/fa'; // Import vegetable icons

const VegetableCards = () => {

  const [tests,setTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tests = await axios.get("/api/find-test");
        setTests(tests.data.tests)

      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8 grid grid-cols-3 gap-4">
      {tests.map((test, index) => (
        <TestCard key={index} test={test} index={index} />
      ))}
    </div>
  );
};

export default VegetableCards;
