"use client"

import React, { useEffect, useRef, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';
import { GifPlayer } from './GifController';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const TestCard = ({ name, color, index }) => {

  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [tests,setTests] = useState([]);
  /*   const gifRef = useRef(null); */

  console.log(isHovered);

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

  const handleClick = () => {
    router.push(`/mock-tests/create-testsession/${tests[3]?.id}`)
  }

  /*   const togglePlay = () => {
      const gif = gifRef.current;
      if (gif) {
        if (isHovered) {
          gif.pause();
        } else {
          gif.play();
        }
        setIsHovered(!isHovered);
      }
    }; */

  return <>
    <div className={`w-72 h-72 rounded-lg p-6 flex flex-col justify-between text-white ${color} shadow-lg mx-4 mb-8 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:translate-y-[-15px] hover:translate-x-[-5px] hover:shadow-2xl hover:shadow-black/60`} onClick={handleClick}>
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="flex items-center mt-2">
          <span className="bg-black text-white px-2 py-1 rounded-md text-xs">Graded by Accuracy</span>
        </div>
      </div>
      <div className="text-center flex justify-end items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* <Image
          src="/i4.png"
          width={200}
          height={200}
          /> */}
        {/* <GifPlayer gifUrl="/i4.gif" previewUrl="/i4.png" width={200} height={200} /> */}
        {isHovered ? <Image
          /* src={`/mock-${index}.gif`} */
          src={`/gre-gif${index + 1}.gif`}
          alt="Your GIF"
          width={200}
          height={200}
          style={{ cursor: "pointer" }}
        /> : <Image
          /* src={`/static-mock-${index}.gif`} */
          src={`/gre${index + 1}.gif`}
          width={200}
          height={200}
        />}
        {/* <Image src="/i2.gif" width={200} height={200} /> */}
      </div>
    </div>
  </>
};

export default TestCard;
