"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TimeBreak = ({ redirectTo }) => {
  const [seconds, setSeconds] = useState(15);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      router.push(redirectTo);
    }
  }, [seconds, redirectTo, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Image */}
      <img
        src="/timeout.jpg" // Replace with your image path
        alt="Take a break"
        className="mb-4"
        style={{ width: "200px", height: "200px" }} // Adjust size as needed
      />
      {/* Slogan */}
      <p className="text-lg font-bold mb-2">Take a Break</p>
      {/* Countdown */}
      <p className="text-xl mb-2">Redirecting in {seconds} seconds...</p>
      {/* Redirecting message */}
      <p className="text-sm text-gray-500">Sit tight!</p>
    </div>
  );
};

export default TimeBreak;
